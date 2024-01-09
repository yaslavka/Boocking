import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PrivateNavbar from '../../../components/PrivateNavbar'
import { Formik, Form } from 'formik'
import styles from './myHotelEdit.module.scss'
import * as hotelIdActions from '../../../actions/hotelId.actions'
import TextInput from '../../../components/TextInput'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import RadioInput from '../../../components/RadioInput'
import { toast } from 'react-toastify'
import { Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'
// import CustomizedHook from '../../../components/AutoComplette/Autucomlet';
// import CustomizedHookno from '../../../components/AutoComplette/no';

function HotelAdd() {
  const dispatch = useDispatch()
  const pRef = useRef()
  const location = useHistory()
  const addSuccess = useSelector((state) => state.myObject.addSuccess)
  const [active, setActive] = useState(false)
  const [wifi, setWifi] = useState(false)
  const [breakfast, setBreakfast] = useState(false)
  const [swimmingPool, setSwimmingPool] = useState(false)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [address, setAddress] = useState('Укажите адрес вашего отеля')
  const [geoCityId, setGeoCityId] = useState(null)
  const [pay, setPay] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (addSuccess && addSuccess?.id) {
      location.push(`/hotel_edit/${addSuccess?.id}`)
    }
  }, [addSuccess?.id])

  const initialValues = useMemo(
    () => ({
      apartmentsCount: '',
      luxCount: '',
      standardCount: '',
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
    [],
  )
  useEffect(() => {
    if (error && error) {
      toast.error(error)
    }
  }, [error])
  const handleSelect = async (e) => {
    const res = await geocodeByAddress(e)
    const lat = await getLatLng(res[0])
    setLatitude(lat.lat)
    setLatitude(lat.lng)
    setAddress(res[0].formatted_address)
  }
  const handleChange = (e) => {
    setAddress(e)
  }
  const onSubmit = useCallback(
    (credentials) => {
      dispatch(
        hotelIdActions.hotelAdd({
          apartmentsCount: credentials.apartmentsCount,
          luxCount: credentials.luxCount,
          standardCount: credentials.standardCount,
          nameHotel: credentials.nameHotel,
          requisitesPay: credentials.requisitesPay,
          phonePay: credentials.phonePay,
          wifi: wifi,
          breakfast: breakfast,
          swimmingPool: swimmingPool,
          discount: credentials.discount,
          latitude: latitude,
          longitude: longitude,
          address: address,
          phone: credentials.phone,
          email: credentials.email,
          price: credentials.price,
          NumberOfRooms: credentials.NumberOfRooms,
          distanceTo: credentials.distanceTo,
          distanceOut: credentials.distanceOut,
          distanceCenter: credentials.distanceCenter,
          distanceRailwayStation: credentials.distanceRailwayStation,
          typeHotel: credentials.typeHotel,
          typeOfRooms: credentials.typeOfRooms,
          descriptionHotel: credentials.descriptionHotel,
          active: active,
          pay: pay,
          geoCityId: geoCityId,
        }),
      )
    },
    [
      dispatch,
      wifi,
      breakfast,
      latitude,
      longitude,
      address,
      active,
      pay,
      geoCityId,
    ],
  )
  useEffect(() => {
    // Проверяем поддерживается ли геолокация в текущем браузере
    if (!navigator.geolocation) {
      setError('Геолокация не поддерживается вашим браузером')
      return
    }

    // Запрашиваем геолокацию
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      },
      (err) => {
        setError(`Ошибка при получении геолокации: ${err.message}`)
      },
    )
  }, [])

  return (
    <PrivateNavbar>
      <>
        <h5 className={styles.title}>Добаление отеля</h5>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {() => (
            <Form>
              <TextInput
                name="apartmentsCount"
                title={'апартаменты'}
                subTitle={'укажите количество номеров типа апартаменты'}
              />
              <TextInput
                name="luxCount"
                title={'Люкс'}
                subTitle={'укажите количество номеров типа Люкс'}
              />
              <TextInput
                name="standardCount"
                title={'Стандарт'}
                subTitle={'укажите количество номеров типа стандарт'}
              />
              <TextInput
                name="nameHotel"
                title={'Имя Отеля'}
                subTitle={'Напишите Название вашего Отеля'}
              />
              <TextInput
                name="requisitesPay"
                title={'Платежные реквизиты'}
                subTitle={'Укажите платежные реквизиты вашего отеля'}
              />
              <TextInput
                name="phonePay"
                title={'Телефон для оплат'}
                subTitle={'Укажите Телефон для приема платежей'}
              />
              <RadioInput
                value={true}
                valueFalse={false}
                title={'WI-FI'}
                checked={wifi}
                onChange={() => setWifi(!wifi)}
                yes={'Есть'}
                no={'Нету'}
              />
              <RadioInput
                value={true}
                valueFalse={false}
                title={'Завтрак'}
                checked={breakfast}
                onChange={() => setBreakfast(!breakfast)}
                yes={'Есть'}
                no={'Нету'}
              />
              <RadioInput
                value={true}
                valueFalse={false}
                title={'Басейн'}
                checked={swimmingPool}
                onChange={() => setSwimmingPool(!swimmingPool)}
                yes={'Есть'}
                no={'Нету'}
              />
              <TextInput
                name="discount"
                title={'Скидка'}
                subTitle={`Какова минимальная скидка? %`}
              />
              <PlacesAutocomplete
                value={address}
                onSelect={handleSelect}
                onChange={handleChange}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div style={{ position: 'relative' }}>
                    <section className={styles.wrapperTextarea}>
                      <p className={styles.descriptionTextarea} ref={pRef}>
                        {'Адресс'}
                      </p>
                      <p className={styles.descriptionTextarea} ref={pRef}>
                        {address}
                      </p>
                      <textarea
                        className={styles.textarea}
                        {...getInputProps({
                          placeholder: 'Полный адрес места положения отеля',
                        })}
                        style={{ height: pRef.current?.clientHeight }}
                      />
                    </section>
                    {loading && (
                      <div
                        style={{
                          position: 'absolute',
                          right: '31.5%',
                          zIndex: 1,
                        }}
                      >
                        lo...
                      </div>
                    )}
                    <div className={styles.dropDownContainer}>
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? styles.suggestionActive
                          : styles.suggestion
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' }
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
                        )
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              <TextInput
                name="phone"
                title={'Телефон Отеля'}
                subTitle={`Укажите телефон вашего отеля}`}
              />
              <TextInput
                name="email"
                title={'Email Отеля'}
                subTitle={`Укажите Email вашего отеля}`}
              />
              <TextInput
                name="price"
                title={'Минимальная цена'}
                subTitle={`Укажите Минимальную цену ваших номеров`}
              />
              <TextInput
                name="NumberOfRooms"
                title={'Количество Номеров'}
                subTitle={`Количество Номеров в вашем отеле`}
              />
              <TextInput
                name="distanceTo"
                title={'дыстанция до пляжа'}
                subTitle={`Какова дистанция до ближаещего пляжа?`}
              />
              <TextInput
                name="distanceCenter"
                title={'дыстанция до центра'}
                subTitle={`Какова дистанция до центра?`}
              />
              <TextInput
                name="distanceRailwayStation"
                title={'дыстанция до Вокзала'}
                subTitle={`Какова дистанция до Вокзала?`}
              />
              <TextInput
                name="typeHotel"
                title={'Тип отеля'}
                subTitle={
                  'Тип вашего отеля отеля ? Хостел || Отель || Гостинница и т.д'
                }
              />
              <TextInput
                name="typeOfRooms"
                title={'Тип Номеров'}
                subTitle={'Тип Номеров'}
              />
              <TextInput
                name="descriptionHotel"
                title={'Описание отеля'}
                subTitle={'раскажите о вашем отеле'}
              />
              <RadioInput
                value={true}
                valueFalse={false}
                title={'Статус'}
                checked={active}
                onChange={() => setActive(!active)}
                yes={'Активен'}
                no={'Не Активен'}
              />
              <RadioInput
                value={true}
                valueFalse={false}
                title={'Безналичный расчет'}
                checked={pay}
                onChange={() => setPay(!pay)}
                yes={'Есть'}
                no={'Нету'}
              />
              <Button color={'primary'} block type={'submit'}>
                Добавить
              </Button>
            </Form>
          )}
        </Formik>
      </>
    </PrivateNavbar>
  )
}
export default HotelAdd
