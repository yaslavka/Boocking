import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PrivateNavbar from '../../../components/PrivateNavbar';
import {Formik, Form, Field} from 'formik';
import styles from './myHotelEdit.module.scss';
import {useParams} from 'react-router-dom';
import * as hotelIdActions from '../../../actions/hotelId.actions';
import TextInput from '../../../components/TextInput';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import RadioInput from '../../../components/RadioInput';
import {toast} from 'react-toastify';
import {Button} from 'reactstrap';
// import CustomizedHook from '../../../components/AutoComplette/Autucomlet';
// import CustomizedHookno from '../../../components/AutoComplette/no';

function MyaHotelEdit() {
  const dispatch =useDispatch();
  const {id} = useParams();
  const pRef = useRef();
  const hotelId = useSelector((state) => state.hotelId.hotelId);
  const [active, setActive]=useState(hotelId && hotelId.active);
  const [imageHotel, setImageHotel]=useState(null);
  const [image, setImage]=useState(null);
  const [wifi, setWifi]=useState(hotelId && hotelId.wifi);
  const [breakfast, setBreakfast]=useState(hotelId && hotelId.wifi);
  const [swimmingPool, setSwimmingPool]=useState(hotelId && hotelId.swimmingPool);
  const [latitude, setLatitude]=useState(hotelId && hotelId.latitude);
  const [longitude, setLongitude]=useState(hotelId && hotelId.longitude);
  const [address, setAddress]=useState(hotelId && hotelId.address);
  const [addressValue, setAddressValue]=useState('');
  const [pay, setPay]=useState(hotelId && hotelId.pay);
  const [error, setError] = useState(null);

  useEffect(()=>{
    if (imageHotel !== null) {
      dispatch(hotelIdActions.uploadImages({imageHotel: imageHotel, id: id}));
    }
  }, [imageHotel, dispatch, id]);

  useEffect(()=>{
    dispatch(hotelIdActions.hotelId(id));
  }, [dispatch, id]);

  const initialValues = useMemo(
      () => ({
        nameHotel: '',
        requisitesPay: '',
        phonePay: '',
        discount: null,
        phone: '',
        email: '',
        price: '',
        NumberOfRooms: null,
        distanceTo: null,
        distanceOut: null,
        distanceCenter: null,
        distanceRailwayStation: null,
        typeHotel: '',
        typeOfRooms: '',
        descriptionHotel: '',
        geoCityId: null,
      }),
      [address],
  );
  useEffect(()=>{
    if (error && error) {
      toast.error(error);
    }
  }, [error, address]);
  const handleSelect = async (e) => {
    const res = await geocodeByAddress(e);
    const lat = await getLatLng(res[0]);
    setLatitude(lat.lat);
    setLatitude(lat.lng);
    setAddress(res[0].formatted_address);
  };
  const handleChange = (e) => {
    setAddressValue(e);
  };
  const onSubmit =useCallback((credentials)=>{
    dispatch(hotelIdActions.hotelIdEdit({
      nameHotel: credentials.nameHotel || hotelId?.nameHotel,
      requisitesPay: credentials.requisitesPay || hotelId?.requisitesPay,
      phonePay: credentials.phonePay || hotelId?.phonePay,
      wifi: wifi,
      breakfast: breakfast,
      swimmingPool: swimmingPool,
      discount: credentials.discount || hotelId?.discount,
      latitude: latitude,
      longitude: longitude,
      address: address,
      phone: credentials.phone || hotelId?.phone,
      email: credentials.email || hotelId?.email,
      bal: hotelId?.bal,
      price: credentials.price || hotelId?.price,
      NumberOfRooms: credentials.NumberOfRooms || hotelId?.NumberOfRooms,
      rating: hotelId?.rating,
      distanceTo: credentials.distanceTo || hotelId?.distanceTo,
      distanceOut: credentials.distanceOut || hotelId?.distanceOut,
      distanceCenter: credentials.distanceCenter || hotelId?.distanceCenter,
      distanceRailwayStation: credentials.distanceRailwayStation || hotelId?.distanceRailwayStation,
      typeHotel: credentials.typeHotel || hotelId?.typeHotel,
      typeOfRooms: credentials.typeOfRooms || hotelId?.typeOfRooms,
      descriptionHotel: credentials.descriptionHotel || hotelId?.descriptionHotel,
      active: active,
      pay: pay,
      geoCityId: credentials.geoCityId || hotelId?.geoCityId,
      id: id,
    }));
  }, [
    dispatch,
    hotelId?.nameHotel,
    hotelId?.requisitesPay,
    wifi, breakfast, hotelId?.discount,
    latitude, longitude, address,
    hotelId?.phone, hotelId?.email,
    hotelId?.bal, hotelId?.price,
    hotelId?.NumberOfRooms,
    hotelId?.rating,
    hotelId?.distanceTo,
    hotelId?.distanceOut,
    hotelId?.distanceCenter,
    hotelId?.distanceRailwayStation,
    hotelId?.typeHotel,
    hotelId?.typeOfRooms,
    hotelId?.descriptionHotel,
    active, pay,
    hotelId?.geoCityId,
    id,
  ]);
  useEffect(() => {
    // Проверяем поддерживается ли геолокация в текущем браузере
    if (!navigator.geolocation) {
      setError('Геолокация не поддерживается вашим браузером');
      return;
    }

    // Запрашиваем геолокацию
    navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          setError(`Ошибка при получении геолокации: ${err.message}`);
        },
    );
  }, []);

  return (
    <PrivateNavbar>
      {hotelId && (
        <>
          <h5 className={styles.title}>
              Редактирование {hotelId.nameHotel}
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
                        <img src={hotelId.imageHotel ?
                          hotelId.imageHotel :
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
              <Form>
                <TextInput
                  name="nameHotel"
                  title={'Имя Отеля'}
                  subTitle={hotelId.nameHotel}
                />
                <TextInput
                  name="requisitesPay"
                  title={'Платежные реквизиты'}
                  subTitle={hotelId.requisitesPay}
                />
                <TextInput
                  name="phonePay"
                  title={'Телефон для оплат'}
                  subTitle={hotelId.phonePay}
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
                <RadioInput
                  value={true}
                  valueFalse={false}
                  title={'Басейн'}
                  checked={swimmingPool}
                  onChange={()=>setSwimmingPool(!swimmingPool)}
                  yes={'Есть'} no={'Нету'}
                />
                <TextInput
                  name="discount"
                  title={'Скидка'}
                  subTitle={`${hotelId.discount} %`}
                />
                <PlacesAutocomplete
                  value={addressValue}
                  onSelect={handleSelect}
                  onChange={handleChange}
                >
                  {({getInputProps, suggestions, getSuggestionItemProps, loading})=>(
                    <div style={{position: 'relative'}}>
                      <section className={styles.wrapperTextarea}>
                        <p className={styles.descriptionTextarea} ref={pRef}>
                          {'Адресс'}
                        </p>
                        <p className={styles.descriptionTextarea} ref={pRef}>
                          {hotelId.address}
                        </p>
                        <textarea
                          className={styles.textarea}
                          {...getInputProps({
                            placeholder: 'Полный адрес места положения отеля',
                          })}
                          style={{height: pRef.current?.clientHeight}}
                        />
                      </section>
                      {loading && <div style={{position: 'absolute', right: '31.5%', zIndex: 1}}>lo...</div>}
                      <div className={styles.dropDownContainer}>
                        {suggestions.map((suggestion)=>{
                          const className = suggestion.active ?
                            styles.suggestionActive :
                            styles.suggestion;
                          const style = suggestion.active ?
                            {backgroundColor: '#fafafa', cursor: 'pointer'} :
                            {backgroundColor: '#ffffff', cursor: 'pointer'};
                          return (
                            <>
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                <TextInput
                  name="phone"
                  title={'Телефон Отеля'}
                  subTitle={`${hotelId.phone}`}
                />
                <TextInput
                  name="email"
                  title={'Email Отеля'}
                  subTitle={`${hotelId.email}`}
                />
                <TextInput
                  name="price"
                  title={'Минимальная цена'}
                  subTitle={`${hotelId.price}`}
                />
                <TextInput
                  name="NumberOfRooms"
                  title={'Количество Номеров'}
                  subTitle={`${hotelId.NumberOfRooms}`}
                />
                <TextInput
                  name="distanceTo"
                  title={'дыстанция до пляжа'}
                  subTitle={`${hotelId.distanceTo}`}
                />
                <TextInput
                  name="distanceCenter"
                  title={'дыстанция до центра'}
                  subTitle={`${hotelId.distanceCenter}`}
                />
                <TextInput
                  name="distanceRailwayStation"
                  title={'дыстанция до Вокзала'}
                  subTitle={`${hotelId.distanceRailwayStation}`}
                />
                <TextInput
                  name="typeHotel"
                  title={'Тип отеля'}
                  subTitle={`${hotelId.typeHotel}`}
                />
                <TextInput
                  name="typeOfRooms"
                  title={'Тип Номеров'}
                  subTitle={`${hotelId.typeOfRooms}`}
                />
                <TextInput
                  name="descriptionHotel"
                  title={'Описание отеля'}
                  subTitle={`${hotelId.descriptionHotel}`}
                />
                <RadioInput
                  value={true}
                  valueFalse={false}
                  title={'Статус'}
                  checked={active}
                  onChange={()=>setActive(!active)}
                  yes={'Активен'} no={'Не Активен'}
                />
                <RadioInput
                  value={true}
                  valueFalse={false}
                  title={'Безналичный расчет'}
                  checked={pay}
                  onChange={()=>setPay(!pay)}
                  yes={'Есть'} no={'Нету'}
                />
                <Button color={'primary'} block type={'submit'}>
                  Сохранить изменения
                </Button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </PrivateNavbar>
  );
}
export default MyaHotelEdit;
