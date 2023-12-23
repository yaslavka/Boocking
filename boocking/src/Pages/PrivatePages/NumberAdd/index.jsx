import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PrivateNavbar from '../../../components/PrivateNavbar';
import {Formik, Form} from 'formik';
import styles from './myHotelEdit.module.scss';
import * as numberActions from '../../../actions/number.actions';
import TextInput from '../../../components/TextInput';
import RadioInput from '../../../components/RadioInput';
import {Button} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {MobileDateTimePicker} from '@mui/x-date-pickers/MobileDateTimePicker';
// import CustomizedHook from '../../../components/AutoComplette/Autucomlet';
// import CustomizedHookno from '../../../components/AutoComplette/no';

function NumberAdd() {
  const dispatch =useDispatch();
  const pRef = useRef();
  const location = useHistory();
  const objects = useSelector((state) => state.myObject.object);
  const [hotelId, setHotelId]=useState(null);
  const addSuccess = useSelector((state) => state.numberInfo.numberAdd);
  const [active, setActive]=useState(false);
  const [wifi, setWifi]=useState(false);
  const [breakfast, setBreakfast]=useState(false);
  const [startDate, setStartDate] = useState( );
  const [endDates, setEndDates] = useState();

  useEffect(()=>{
    if (addSuccess && addSuccess?.id) {
      location.push(`/my_hotel/number-edit/${addSuccess?.id}`);
    }
  }, [addSuccess?.id]);

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

  const onSubmit =useCallback((credentials)=>{
    dispatch(numberActions.numberAdd({
      ...credentials, wifi, breakfast, active, hotelId,
      startDate: moment(startDate?.$d).format('ddd, MMM D, YYYY h:mm').replace(/\s[APMapm]{2}$/, ''),
      endDates: moment(endDates?.$d).format('ddd, MMM D, YYYY h:mm').replace(/\s[APMapm]{2}$/, ''),
    }));
  }, [
    dispatch,
    wifi, breakfast,
    active,
    startDate?.$d,
    endDates?.$d,
    hotelId,
  ]);

  return (
    <PrivateNavbar>
      <>
        <h5 className={styles.title}>
          Добаление Номера
        </h5>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {()=>(
            <Form>
              <section className={styles.wrapperTextarea}>
                <p className={styles.descriptionTextarea} ref={pRef}>
                  {'Отель'}
                </p>
                <p className={styles.descriptionTextarea} ref={pRef}>
                  {'Выбирете отель для которого добавляем номер'}
                </p>
                <select style={{height: pRef.current?.clientHeight}} onChange={(e)=>{
                  setHotelId(e.target.value);
                }}>
                  <option disabled defaultValue={'название Отеля'} value='название Отеля'>название Отеля</option>
                  {objects?.length > 0 && (
                    <>
                      {objects.map((item, index)=>(
                        <option key={index} value={item.id}>{item.nameHotel}</option>
                      ))}
                    </>
                  )}
                </select>
              </section>
              <section className={styles.wrapperTextarea}>
                <p className={styles.descriptionTextarea} ref={pRef}>
                  {'Начало периода'}
                </p>
                <p className={styles.descriptionTextarea} ref={pRef}>
                  {'Укажите Дату начала заселения'}
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
                  {'конец периода'}
                </p>
                <p className={styles.descriptionTextarea} ref={pRef}>
                  {'Укажите Дату начала выезда'}
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
                title={'Имя номера'}
                subTitle={'Напишите Название вашего Номера'}
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
                subTitle={`Какова минимальная скидка? %`}
              />
              <TextInput
                name="price"
                title={'Минимальная цена'}
                subTitle={`Укажите Минимальную цену ваших номеров`}
              />
              <TextInput
                name="sleepingPlaces"
                title={'Количество Спальных мест'}
                subTitle={`Количество Спальных мест в вашем номере`}
              />
              <TextInput
                name="rooms"
                title={'Количество комнат в номере'}
                subTitle={`Укажите Количество комнат в номере`}
              />
              <TextInput
                name="quadrature"
                title={'Площадь номера'}
                subTitle={`Какова Площадь номера?`}
              />
              <TextInput
                name="guests"
                title={'Допустимое количество взрослых'}
                subTitle={`Каково Допустимое количество взрослых в номере?`}
              />
              <TextInput
                name="typeNumber"
                title={'Тип Номера'}
                subTitle={'Тип вашего отеля отеля ? Люкс || апартаменты || комната на двоих и т.д'}
              />
              <TextInput
                name="count"
                title={'количество детей в ноере'}
                subTitle={'Допустимое количество детей в ноере'}
              />
              <TextInput
                name="descriptionNumber"
                title={'Описание Номера'}
                subTitle={'раскажите об этом номере'}
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
                Добавить
              </Button>
            </Form>
          )}
        </Formik>
      </>
    </PrivateNavbar>
  );
}
export default NumberAdd;
