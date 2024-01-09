import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import confirm from 'reactstrap-confirm'
import * as hotelIdActions from '../../actions/hotelId.actions'
import * as reservationActions from '../../actions/reservation.actions'
import styles from './index.module.scss'
import HotelIdNav from '../../components/HotelIdNav'
import { Col, Row } from 'reactstrap'
import NavBarHotelId from '../../components/NavabarHotelId'
import HeaderHotel from '../../components/HeaderHotel'
import Links from '../../components/Links/Links'
import PhotoAlbums from '../../components/PhotoAlbums'
import DescriptionHotel from '../../components/DescriptionHotel'
import Offers from '../../components/Offers'
import { Button } from 'reactstrap'
import { declOfNum } from '../../utils'
import Number from '../../components/Number'
import NumberChoice from '../../components/NumberChoice'
import ReviewComponent from '../../components/ReviewComponent'
import moment from 'moment'
import 'moment/locale/en-in'
import filter from 'lodash.filter'
import { date } from 'yup'

function HotelId() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { t } = useTranslation('common')
  const hotelId = useSelector((state) => state.hotelId.hotelId)
  const [morItem, setMorItem] = useState(3)
  const [morReview, setMorReview] = useState(3)
  const [endDates, setEndDates] = useState()
  const [startDate, setStartDate] = useState()
  const [room, setRoom] = useState(1)
  const [go, setGo] = useState(1)
  const [filterActive, setFilterActive] = useState(false)
  const [hotelFtFiltered, setHotelFiltered] = useState([])
  useEffect(() => {
    dispatch(hotelIdActions.hotelId(id))
  }, [dispatch, id])
  const slice = hotelId && hotelId.number.slice(0, morItem)
  const sliceReview = hotelId && hotelId.review.slice(0, morReview)

  const LoadMor = () => {
    setMorItem(morItem + hotelId?.number.length)
  }
  const loadMorReview = () => {
    setMorReview(morReview + hotelId.review.length)
  }
  const broneceng = async (count, price, index, endDates) => {
    const planetLength = +room
    const result = await confirm({
      title: `${t('Подтвердите бронь')}`,
      message: `${t(
        'Бронирование номера сколичеством',
      )} ${planetLength} ${declOfNum(planetLength, [
        `${t('комната')}`,
        `${t('комнаты')}`,
        `${t('комнат')}`,
      ])}, ${t('на сумму')} ${planetLength * +price} RUB?`,
      confirmText: `${t('Подтвердить')}`,
      confirmColor: 'danger',
      cancelText: `${t('Отменить')}`,
      cancelColor: 'link text-muted',
    })

    if (result) {
      dispatch(
        reservationActions.reservationBook({
          id: index,
          count: room,
          sum: planetLength * +price,
          startDate: moment(startDate)
            .format('ll')
            .replace(/\s[APMapm]{2}$/, ''),
          endDates: moment(endDates)
            .format('ll')
            .replace(/\s[APMapm]{2}$/, ''),
          go: go,
        }),
      )
    }
  }
  const containsHotel = (hotel, child, startDate, endDates, people) => {
    const itemStartDate = hotel.startDate
    const itemEndDate = hotel.endDates
    const selectedStartDate = moment(startDate)
      .format('DD MMM YYYY')
      .replace(/\s[APMapm]{2}$/, '')
    const selectedEndDate = moment(endDates)
      .format('DD MMM YYYY')
      .replace(/\s[APMapm]{2}$/, '')
    console.log(selectedStartDate)
    return (
      (itemStartDate === selectedStartDate &&
        itemEndDate === selectedEndDate) ||
      +hotel.guests === people
    )
  }

  useEffect(() => {
    const filterValue = filter(hotelId?.number, (item) => {
      return containsHotel(item, room, startDate, endDates, go)
    })
    if (filterActive === true) {
      if (filterValue?.length === 0) {
        setHotelFiltered([])
      } else {
        setHotelFiltered(filterValue)
      }
    }
  }, [hotelId?.number, room, startDate, endDates, go])

  useEffect(() => {
    if (startDate && endDates) {
      setFilterActive(true)
    } else {
      setFilterActive(false)
    }
  }, [startDate, endDates])
  return (
    <>
      <div className={styles.root}>
        {hotelId && <HotelIdNav hotelId={hotelId} t={t} />}
        <div className={styles.main}>
          <Row>
            <Col xl={3} className={styles.colNav}>
              <NavBarHotelId />
            </Col>
            {hotelId && (
              <Col xl={9}>
                <HeaderHotel hotelId={hotelId} />
                <Links />
                <section className={styles.section}>
                  <PhotoAlbums hotelId={hotelId} />
                </section>
                <section className={styles.section}>
                  <Row>
                    <Col xl={9}>
                      <DescriptionHotel hotelId={hotelId} />
                    </Col>
                    <Col xl={3}>
                      <Offers hotelId={hotelId} />
                    </Col>
                  </Row>
                </section>
                <section className={styles.section}>
                  <div
                    style={{ fontWeight: 800, fontSize: 30, color: '#6926ac' }}
                  >
                    Все номера отеля
                  </div>
                </section>
                <NumberChoice
                  endDates={endDates}
                  setEndDates={setEndDates}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  setRoom={setRoom}
                  setGo={setGo}
                />
                <section className={styles.section}>
                  {filterActive ? (
                    <>
                      {hotelFtFiltered.length > 0 ? (
                        <>
                          <Row>
                            {hotelFtFiltered.map((number) => {
                              return (
                                <>
                                  <Number
                                    key={number.id}
                                    number={number}
                                    broneceng={broneceng}
                                    hotelId={hotelId}
                                    startDate={startDate}
                                    endDates={endDates}
                                    room={room}
                                  />
                                </>
                              )
                            })}
                            <Button
                              color={'primary'}
                              type={'button'}
                              onClick={LoadMor}
                              className={styles.loadMor}
                            >
                              Показать все номера ({hotelId?.number.length} шт.){' '}
                              <span className="fa fa-arrow-down" />
                            </Button>
                          </Row>
                        </>
                      ) : (
                        <h1>
                          По вашему запросу ничего не найденно измените
                          параметры поиска
                        </h1>
                      )}
                    </>
                  ) : (
                    <>
                      {slice && (
                        <Row>
                          {slice.map((number) => {
                            return (
                              <>
                                <Number
                                  key={number.id}
                                  number={number}
                                  broneceng={broneceng}
                                  hotelId={hotelId}
                                  startDate={startDate}
                                  endDates={endDates}
                                  room={room}
                                />
                              </>
                            )
                          })}
                          <Button
                            color={'primary'}
                            type={'button'}
                            onClick={LoadMor}
                            className={styles.loadMor}
                          >
                            Показать все номера ({hotelId?.number.length} шт.){' '}
                            <span className="fa fa-arrow-down" />
                          </Button>
                        </Row>
                      )}
                    </>
                  )}
                </section>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 30,
                    color: '#6926ac',
                    textAlign: 'center',
                  }}
                >
                  ОТЗЫВЫ РЕАЛЬНЫХ ГОСТЕЙ ПОСЛЕ ПРОЖИВАНИЯ
                </div>
                {sliceReview && (
                  <ReviewComponent
                    review={sliceReview}
                    hotelId={hotelId}
                    loadMorReview={loadMorReview}
                  />
                )}
              </Col>
            )}
          </Row>
        </div>
      </div>
    </>
  )
}
export default HotelId
