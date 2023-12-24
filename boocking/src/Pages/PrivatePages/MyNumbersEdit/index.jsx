import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {MobileDateTimePicker} from '@mui/x-date-pickers/MobileDateTimePicker';
import 'dayjs/locale/ru';
import PrivateNavbar from '../../../components/PrivateNavbar';
import {Formik, Form} from 'formik';
import styles from './myHotelEdit.module.scss';
import {useParams} from 'react-router-dom';
import * as numberIdActions from '../../../actions/number.actions';
import TextInput from '../../../components/TextInput';
import RadioInput from '../../../components/RadioInput';
import {Button, Col, Row} from 'reactstrap';
import moment from 'moment';
import 'moment/locale/ru';


function MyNumbersEdit() {
  const dispatch =useDispatch();
  const {id} = useParams();
  const pRef = useRef();
  const numberId = useSelector((state) => state.numberInfo.numberInfo);
  const [active, setActive]=useState(numberId && numberId.active);
  const [imageHotel, setImageHotel]=useState(null);
  const [image, setImage]=useState(null);
  const [wifi, setWifi]=useState(numberId && numberId.wifi);
  const [breakfast, setBreakfast]=useState(numberId && numberId.breakfast);
  const [albumsphoto, setAlbumsphoto] = useState([]);
  const [album, setAlbum] = useState([]);
  const [startDate, setStartDate] = useState( );
  const [endDates, setEndDates] = useState();

  useEffect(()=>{
    if (imageHotel !== null) {
      dispatch(numberIdActions.uploadImages({imageNumber: imageHotel, id: id}));
    }
  }, [imageHotel, dispatch, id]);

  useEffect(()=>{
    dispatch(numberIdActions.numberInfo(id));
  }, [dispatch, id]);

  const initialValues = useMemo(
      () => ({
        nameNumber: '',
        descriptionNumber: '',
        typeNumber: '',
        sleepingPlaces: null,
        rooms: null,
        quadrature: null,
        guests: null,
        discount: null,
        price: null,
        count: null,
      }),
      [],
  );


  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const selectedFilesArray = Array.from(files);
    setAlbum((prevState) => prevState.concat(selectedFilesArray));
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setAlbumsphoto((previousImages) => previousImages.concat(imagesArray));
  };

  const onSelectFile = (event) => {
    event.preventDefault();
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    setAlbum((prevState) => prevState.concat(selectedFilesArray));
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setAlbumsphoto((previousImages) => previousImages.concat(imagesArray));


    // FOR BUG IN CHROME
    event.target.value = '';
  };

  const albumUpload = (e)=>{
    e.preventDefault();
    dispatch(numberIdActions.uploadImagesAlbum({id: id, album: album}));
  };

  function deleteHandler(image) {
    setAlbumsphoto(albumsphoto.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const onSubmit =useCallback((credentials)=>{
    dispatch(numberIdActions.numberIdEdit({
      startDate: moment(startDate?.$d).format('ddd, MMM D, YYYY h:mm').replace(/\s[APMapm]{2}$/, '') || numberId?.startDate,
      endDates: moment(endDates?.$d).format('ddd, MMM D, YYYY h:mm').replace(/\s[APMapm]{2}$/, '') || numberId?.endDates,
      nameNumber: credentials.nameNumber || numberId?.nameNumber,
      descriptionNumber: credentials.descriptionNumber || numberId?.descriptionNumber,
      typeNumber: credentials.typeNumber || numberId?.typeNumber,
      sleepingPlaces: credentials.sleepingPlaces || numberId?.sleepingPlaces,
      rooms: credentials.rooms || numberId?.rooms,
      quadrature: credentials.quadrature || numberId?.quadrature,
      guests: credentials.guests || numberId?.guests,
      discount: credentials.discount || numberId?.discount,
      price: credentials.price || numberId?.price,
      count: credentials.count || numberId?.count,
      active: active,
      wifi: wifi,
      breakfast: breakfast,
      id: id,
      hotelId: numberId?.hotelId,
    }));
  }, [
    dispatch,
    startDate?.$d,
    endDates?.$d,
    numberId?.startDate,
    numberId?.endDates,
    numberId?.nameNumber,
    numberId?.descriptionNumber,
    numberId?.typeNumber,
    numberId?.sleepingPlaces,
    numberId?.rooms,
    numberId?.quadrature,
    numberId?.guests,
    numberId?.discount,
    numberId?.price,
    numberId?.count,
    active,
    wifi,
    breakfast,
    id,
    numberId?.hotelId,
  ]);


  return (
    <PrivateNavbar>
      {numberId && (
        <>
          <h5 className={styles.title}>
              Редактирование {numberId.nameNumber}
          </h5>
          <div className={styles.imagesWrapper}>
            <div>
              <div className={styles.imagesWrapperTitle}>
                <p className="css-1pyrx33"
                  style={
                    {fontWeight: 400, fontSize: 'calc(1.142rem)', textTransform: 'none', textAlign: 'center'}}
                >
                  Выберите изображение
                </p>
              </div>
              <div className={styles.imagesWrapperUpload}>
                <div className={styles.imagesContainer}>
                  <div className={styles.images}
                    onClick={() => document.querySelector('.input-upload-img').click()}
                  >
                    {
                      image ?
                        <img src={image} alt={image} height={'auto'} width={300}/> :
                        <img src={numberId.imageNumber ?
                          numberId.imageNumber :
                            'https://www.w3schools.com/howto/img_avatar.png'} alt={''} height={'auto'} width={300}
                        />

                    }
                  </div>
                  <input
                    hidden
                    type={'file'}
                    accept="image/*"
                    className="input-upload-img"
                    onChange={({target: {files}})=>{
                      if (files) {
                        setImage(URL.createObjectURL(files[0]));
                        setImageHotel(files[0]);
                      }
                    }}/>
                </div>
              </div>
            </div>
          </div>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {()=>(
              <Form style={{marginBottom: 20}}>
                <section className={styles.wrapperTextarea}>
                  <p className={styles.descriptionTextarea} ref={pRef}>
                    {'Укажите Дату начала заселения'}
                  </p>
                  <p className={styles.descriptionTextarea} ref={pRef}>
                    {moment(numberId?.startDate).locale('ru').format('DD MMMM YYYY h:mm A')}
                  </p>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                    <DemoContainer components={[
                      'MobileDateTimePicker',
                    ]}>
                      <MobileDateTimePicker className={styles.fi}
                        views={['day', 'month', 'year', 'hours', 'minutes', 'seconds']}
                        label="Дата Заезда"
                        onChange={setStartDate}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </section>
                <section className={styles.wrapperTextarea}>
                  <p className={styles.descriptionTextarea} ref={pRef}>
                    {'Укажите Дату начала заселения'}
                  </p>
                  <p className={styles.descriptionTextarea} ref={pRef}>
                    {moment(numberId?.endDates).locale('ru').format('DD MMMM YYYY h:mm A')}
                  </p>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                    <DemoContainer components={[
                      'MobileDateTimePicker',
                    ]}>
                      <MobileDateTimePicker className={styles.fi}
                        views={['day', 'month', 'year', 'hours', 'minutes', 'seconds']}
                        locale="ru"
                        label="Дата Выезда"
                        onChange={setEndDates}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </section>
                <TextInput
                  name="nameNumber"
                  title={'Имя Номера'}
                  subTitle={numberId.nameNumber}
                />
                <TextInput
                  name="descriptionNumber"
                  title={'Описание номера'}
                  subTitle={numberId.descriptionNumber}
                />
                <TextInput
                  name="typeNumber"
                  title={'Укажите тип номера'}
                  subTitle={numberId.typeNumber}
                />
                <RadioInput
                  value={true}
                  valueFalse={false}
                  title={'WI-FI'}
                  checked={wifi}
                  onChange={()=>setWifi(!wifi)}
                  yes={'Есть'} no={'Нету'}
                />
                <RadioInput
                  value={true}
                  valueFalse={false}
                  title={'Завтрак'}
                  checked={breakfast}
                  onChange={()=>setBreakfast(!breakfast)}
                  yes={'Есть'} no={'Нету'}
                />
                <TextInput
                  name="discount"
                  title={'Скидка'}
                  subTitle={`${numberId.discount} %`}
                />
                <TextInput
                  name="sleepingPlaces"
                  title={'Количество кроватей в номере'}
                  subTitle={`${numberId.sleepingPlaces}`}
                />
                <TextInput
                  name="rooms"
                  title={'Количество комнат в номере'}
                  subTitle={`${numberId.rooms}`}
                />
                <TextInput
                  name="price"
                  title={'Минимальная цена'}
                  subTitle={`${numberId.price}`}
                />
                <TextInput
                  name="quadrature"
                  title={'Квадратура номера'}
                  subTitle={`${numberId.quadrature}`}
                />
                <TextInput
                  name="guests"
                  title={'Количество взрослых в номере'}
                  subTitle={`${numberId.guests}`}
                />
                <TextInput
                  name="count"
                  title={'Количество детей в номере'}
                  subTitle={`${numberId.count}`}
                />
                <RadioInput
                  value={true}
                  valueFalse={false}
                  title={'Статус'}
                  checked={active}
                  onChange={()=>setActive(!active)}
                  yes={'Активен'} no={'Не Активен'}
                />
                <Button color={'primary'} block type={'submit'}>
                  Сохранить изменения
                </Button>
              </Form>
            )}
          </Formik>
          <form>
            <div>
              {albumsphoto.length > 0 && (
                <Row>
                  {albumsphoto.map((item, index)=>(
                    <Col lg={4} md={5} key={index} style={{marginBottom: 10}}>
                      <div className={styles.imagesWrapperUpload}>
                        <div className={styles.imagesContainer}>
                          <div className={styles.images}
                            onClick={() => {
                              deleteHandler(item);
                            }}
                          >
                            <img src={item} alt={image} height={'auto'} width={300}/>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
            <div className={styles.imagesWrapper} onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}>
              <div>
                <div className={styles.imagesWrapperTitle}>
                  <p className="css-1pyrx33"
                    style={
                      {fontWeight: 400, fontSize: 'calc(1.142rem)', textTransform: 'none', textAlign: 'center'}}
                  >
                    Добавте фото в альбом отеля/или перетащите с пк
                  </p>
                </div>
                <div className={styles.imagesWrapperUpload}>
                  <div className={styles.imagesContainer}>
                    <div className={styles.images}
                      onClick={() => document.querySelector('.input-upload-album').click()}
                    >
                      <img src={'https://www.w3schools.com/howto/img_avatar.png'} alt={''} height={'auto'} width={200} />
                    </div>
                    <input
                      hidden
                      type={'file'}
                      accept="image/*"
                      className="input-upload-album"
                      multiple
                      onChange={onSelectFile}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button color={'primary'} block type={'submit'} onClick={albumUpload}>
              Загрузить
            </Button>
          </form>
        </>
      )}
    </PrivateNavbar>
  );
}
export default MyNumbersEdit;
