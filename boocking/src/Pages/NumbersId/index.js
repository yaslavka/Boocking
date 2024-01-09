import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as numberIdActions from '../../actions/number.actions'
import styles from './number.module.scss'
import { Col, Form, Row, Button } from 'reactstrap'
import NavBarHotelId from '../../components/NavabarHotelId'
import { useTranslation } from 'react-i18next'
import HotelIdNav from '../../components/HotelIdNav'
import HeaderHotel from '../../components/HeaderHotel'
import Links from '../../components/Links/Links'
import PhotoAlbums from '../../components/PhotoAlbums'
import DescriptionHotel from '../../components/DescriptionHotel'
import Offers from '../../components/Offers'
import { Box, Slider } from '@mui/material'

function NumbersId() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { t } = useTranslation('common')
  const numberId = useSelector((state) => state.numberInfo.numberInfo)
  const hotelId = numberId?.hotel || null
  const [location, setLocation] = useState(0)
  const [service, setService] = useState(0)
  const [price, setPrice] = useState(0)
  const [purity, setPurity] = useState(0)
  const [nutrition, setNutrition] = useState(0)
  const [dream, setDream] = useState(0)
  const [reviewText, setReviewText] = useState({ positive: '', negative: '' })
  const { positive, negative } = reviewText
  useEffect(() => {
    dispatch(numberIdActions.numberInfo(id))
  }, [dispatch, id])
  const handleChangeLocation = (event, newValue) => {
    setLocation(newValue)
  }
  const handleChangeService = (event, newValue) => {
    setService(newValue)
  }
  const handleChangePrice = (event, newValue) => {
    setPrice(newValue)
  }
  const handleChangePurity = (event, newValue) => {
    setPurity(newValue)
  }
  const handleChangNutrition = (event, newValue) => {
    setNutrition(newValue)
  }
  const handleChangDream = (event, newValue) => {
    setDream(newValue)
  }
  const handleChangPositive = (event) => {
    setReviewText((prevState) => ({
      ...prevState,
      positive: event.target.value,
    }))
  }
  const handleChangNegative = (event) => {
    setReviewText((prevState) => ({
      ...prevState,
      negative: event.target.value,
    }))
  }
  const reviewSend = (e) => {
    e.preventDefault()
    dispatch(
      numberIdActions.reviewSend({
        location,
        service,
        price,
        purity,
        nutrition,
        dream,
        positive,
        negative,
      }),
    )
  }
  return (
    <>
      <div className={styles.root}>
        {hotelId && <HotelIdNav hotelId={hotelId} t={t} />}
      </div>
      <div className={styles.main}>
        <Row style={{ margin: '0 auto' }}>
          <Col xl={3} className={styles.colNav}>
            <NavBarHotelId />
          </Col>
          {numberId && hotelId && (
            <Col xl={9}>
              <HeaderHotel numberId={numberId} number hotelId={hotelId} />
              <Links />
              <section className={styles.section}>
                <PhotoAlbums hotelId={hotelId} number numberId={numberId} />
              </section>
              <section className={styles.section}>
                <Row>
                  <Col xl={9}>
                    <DescriptionHotel
                      hotelId={hotelId}
                      numberId={numberId}
                      number
                    />
                  </Col>
                  <Col xl={3}>
                    <Offers hotelId={hotelId} />
                  </Col>
                </Row>
              </section>
              <section className={styles.section}>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 30,
                    color: '#6926ac',
                    textAlign: 'center',
                  }}
                >
                  Оставить отзыв
                </div>
              </section>
              <section className={styles.section}>
                <div
                  style={{ fontWeight: 500, fontSize: 15, color: '#090809' }}
                >
                  Шаг № 1 | Оценка по параметрам
                </div>
              </section>
              <section className={styles.section}>
                <Form onSubmit={reviewSend}>
                  <Row className={styles.section}>
                    <Col xl={6}>
                      <div className={styles.marginBottom}>
                        <div className={styles.padding}>
                          <article className={styles.flexSpaceBetween}>
                            <div>Расположение</div>
                            <div>{numberId.bal}</div>
                          </article>
                        </div>
                        <Box sx={{ width: 410 }}>
                          <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={location}
                            max={5}
                            onChange={handleChangeLocation}
                            valueLabelDisplay="auto"
                          />
                        </Box>
                      </div>
                      <div className={styles.marginBottom}>
                        <div className={styles.padding}>
                          <article className={styles.flexSpaceBetween}>
                            <div>Обслуживание</div>
                            <div>{hotelId.bal}</div>
                          </article>
                        </div>
                        <Box sx={{ width: 410 }}>
                          <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={service}
                            max={5}
                            onChange={handleChangeService}
                            valueLabelDisplay="auto"
                          />
                        </Box>
                      </div>
                      <div className={styles.marginBottom}>
                        <div className={styles.padding}>
                          <article className={styles.flexSpaceBetween}>
                            <div>Цена/Качество</div>
                            <div>{hotelId.bal}</div>
                          </article>
                        </div>
                        <Box sx={{ width: 410 }}>
                          <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={price}
                            max={5}
                            onChange={handleChangePrice}
                            valueLabelDisplay="auto"
                          />
                        </Box>
                      </div>
                    </Col>
                    <Col xl={6}>
                      <div className={styles.marginBottom}>
                        <div className={styles.padding}>
                          <article className={styles.flexSpaceBetween}>
                            <div>Чистота</div>
                            <div>{numberId.bal}</div>
                          </article>
                        </div>
                        <Box sx={{ width: 410 }}>
                          <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={purity}
                            max={5}
                            onChange={handleChangePurity}
                            valueLabelDisplay="auto"
                          />
                        </Box>
                      </div>
                      <div className={styles.marginBottom}>
                        <div className={styles.padding}>
                          <article className={styles.flexSpaceBetween}>
                            <div>Питание</div>
                            <div>{hotelId.bal}</div>
                          </article>
                        </div>
                        <Box sx={{ width: 410 }}>
                          <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={nutrition}
                            max={5}
                            onChange={handleChangNutrition}
                            valueLabelDisplay="auto"
                          />
                        </Box>
                      </div>
                      <div className={styles.marginBottom}>
                        <div className={styles.padding}>
                          <article className={styles.flexSpaceBetween}>
                            <div>Качество сна</div>
                            <div>{hotelId.bal}</div>
                          </article>
                        </div>
                        <Box sx={{ width: 410 }}>
                          <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={dream}
                            max={5}
                            onChange={handleChangDream}
                            valueLabelDisplay="auto"
                          />
                        </Box>
                      </div>
                    </Col>
                  </Row>
                  <section className={styles.section}>
                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: 15,
                        color: '#090809',
                      }}
                    >
                      Шаг № 2 | Оставте свои впечетления после пребывания в
                      данном номере
                    </div>
                  </section>
                  <section className={styles.section}>
                    <textarea
                      placeholder="Положительный отзыв"
                      name="positive"
                      value={positive}
                      onChange={handleChangPositive}
                    />
                  </section>
                  <section className={styles.section}>
                    <textarea
                      placeholder="Отрецательный отзыв"
                      name="positive"
                      value={negative}
                      onChange={handleChangNegative}
                    />
                  </section>
                  <section className={styles.section}>
                    <Button color="primary" type="submit">
                      Отправить отзыв
                    </Button>
                  </section>
                </Form>
              </section>
            </Col>
          )}
        </Row>
      </div>
    </>
  )
}
export default NumbersId
