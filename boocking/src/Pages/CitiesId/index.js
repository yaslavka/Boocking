import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import * as citiesActions from '../../actions/geo.actions'
import SearchForm from '../../components/SearchForm'
import { useTranslation } from 'react-i18next'
import filter from 'lodash.filter'
import styles from './index.module.scss'
import routesLik from '../../constants/routes.constants'
import { Col, Row } from 'react-bootstrap'
import NavBarFilters from '../../components/NavBarFilters'
import { populars } from '../../components/Popular/data'
import ListHotel from '../../components/ListHotel/ListHotel'

const linkMap = [
  {
    id: 0,
    title: 'Популярность',
  },
  {
    id: 1,
    title: 'Оценка по отзывам',
  },
  {
    id: 2,
    title: 'Звезды',
  },
  {
    id: 3,
    title: 'Расположение',
  },
  {
    id: 4,
    title: 'Цена',
  },
]
const viewBox = [
  {
    id: 0,
    title: 'Плитка',
    className: 'fa fa-th',
  },
  {
    id: 1,
    title: 'Список',
    className: 'fa fa-th-list',
  },
  {
    id: 2,
    title: 'На карте',
    className: 'fa fa-map-marker',
  },
]

function valuetext(value) {
  return `${value} р`
}

function CitiesId() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const location = useHistory()
  const { t } = useTranslation('common')
  const [type, setType] = useState(0)
  const [title, setTitle] = useState(1)
  const cities = useSelector((state) => state.geo.cities)
  const citiesId = useSelector((state) => state.geo.citiesId)
  const hotels = citiesId && citiesId.hotel
  const [hotelFtFiltered, setHotelFiltered] = useState([])
  const [isWifi, seIsWif] = useState(null)
  const [popular, setPopular] = useState([])
  const [filterActive, setFilterActive] = useState(false)
  const [value, setValue] = useState([300, 0])

  useEffect(() => {
    dispatch(citiesActions.citiesIdInfo(id))
  }, [dispatch, id])

  useEffect(() => {
    setPopular(populars)
    setHotelFiltered(citiesId && citiesId.hotel)
  }, [citiesId])

  const Populars = (i) => {
    const stateList = popular && popular
    const changeCheckedCuisines = stateList.map((item) =>
      item.id === i ? { ...item, checked: !item.checked } : item,
    )
    const allCheckedValues = changeCheckedCuisines.map(
      (item) => item.checked === true,
    )
    setPopular(changeCheckedCuisines)
    setFilterActive(allCheckedValues.includes(true))
  }

  const containsHotel = (
    hotel,
    price,
    wifi,
    name,
    hostel,
    host,
    breakfast,
    mini,
    h,
    a,
    b,
    child,
    startDate,
    endDates,
    people,
  ) => {
    const hasChildRoom =
      hotel.number &&
      hotel.number.some((item) => {
        return +item.count === Number(child)
      })

    const withinDateRange =
      hotel.number &&
      hotel.number.some((item) => {
        const itemStartDate = +new Date(item.startDate)
        const itemEndDate = +new Date(item.endDates)
        const selectedStartDate = +new Date(startDate)
        const selectedEndDate = +new Date(endDates)
        return (
          itemStartDate >= selectedStartDate && itemEndDate <= selectedEndDate
        )
      })

    const guests =
      hotel.number &&
      hotel.number.some((item) => {
        return +item.guests === Number(people)
      })
    return (
      (hasChildRoom && withinDateRange && guests) ||
      (hotel.price >= price[0] && hotel.price <= price[1]) ||
      hotel.wifi === wifi ||
      hotel.typeHotel.toString() === name ||
      hotel.typeHotel.toString() === hostel ||
      hotel.typeHotel.toString() === host ||
      hotel.breakfast === breakfast ||
      hotel.typeHotel.toString() === mini ||
      hotel.typeHotel.toString() === h ||
      hotel.typeHotel.toString() === a ||
      hotel.typeHotel.toString() === b
    )
  }

  useEffect(() => {
    const activeWifiFilters = popular.filter(
      (item) => item.checked && item.wifi,
    )[0]?.wifi
    const activeBreakfastFilters = popular.filter(
      (item) => item.checked && item.breakfast,
    )[0]?.breakfast
    const activeTypeHotel = popular.filter(
      (item) => item.checked && item.label === 'Отель',
    )[0]?.label
    const activeTypeHostel = popular.filter(
      (item) => item.checked && item.label === 'Хостел',
    )[0]?.label
    const activeTypeHost = popular.filter(
      (item) => item.checked && item.label === 'Гостиница',
    )[0]?.label
    const activeMini = popular.filter(
      (item) => item.checked && item.label === 'Мини-отель',
    )[0]?.label
    const activeH = popular.filter(
      (item) => item.checked && item.label === 'Гостевой дом',
    )[0]?.label
    const activeA = popular.filter(
      (item) => item.checked && item.label === 'Апарт-отель',
    )[0]?.label
    const activeAp = popular.filter(
      (item) => item.checked && item.label === 'Апартаменты',
    )[0]?.label
    const filterValue = filter(hotels, (item) => {
      return containsHotel(
        item,
        value,
        activeWifiFilters,
        activeTypeHotel,
        activeTypeHostel,
        activeTypeHost,
        activeBreakfastFilters,
        activeMini,
        activeH,
        activeA,
        activeAp,
        location?.location.state?.child?.value,
        location?.location?.state?.startDate,
        location?.location?.state?.endDates,
        location?.location?.state?.people?.value,
      )
    })
    if (filterActive === true) {
      if (filterValue?.length === 0) {
        setHotelFiltered([])
      } else {
        setHotelFiltered(filterValue)
      }
    }
  }, [
    hotels,
    popular,
    value,
    location.location.state?.child?.value,
    location?.location?.state?.endDates,
    location?.location?.state?.startDate,
    location?.location?.state?.people?.value,
  ])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  useEffect(() => {
    if (
      value[1] > 0 ||
      hotelFtFiltered?.length > 0 ||
      (location?.location.state?.child?.value > 0 &&
        location?.location?.state?.startDate &&
        location?.location?.state?.endDates &&
        location?.location?.state?.people?.value > 0)
    ) {
      setFilterActive(true)
    } else {
      setFilterActive(false)
    }
  }, [
    value[1],
    hotelFtFiltered?.length,
    value,
    location?.location.state?.child?.value,
    location?.location?.state?.startDate,
    location?.location?.state?.endDates,
    location?.location?.state?.people?.value,
    location.location.state,
  ])

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.root}>
          <div style={{ marginBottom: 20 }} />
          <div className={styles.searchContainer}>
            <SearchForm t={t} cities={cities} pathId={id} />
          </div>
          {citiesId && (
            <>
              <div className={styles.pagesTitle}>
                <Link className={styles.pagesLinks} to={routesLik.root}>
                  Главная
                </Link>
                <div className={styles.pagesArrow}> {'>'} </div>
                <Link className={styles.pagesLinks} to={routesLik.root}>
                  {citiesId.geo_region.geo_region}
                </Link>
                <div className={styles.pagesArrow}> {'>'} </div>
                <Link
                  className={styles.pagesLinks}
                  to={`/search_hotel_home/${citiesId.id}`}
                >
                  {citiesId.geo_city}
                </Link>
              </div>
              <div className={styles.pagesSubTitle}>
                Отели {citiesId.geo_city}
              </div>
            </>
          )}
          <Row>
            <Col xl={3}>
              <h5 style={{ paddingInline: 30, paddingTop: 30 }}>По цене</h5>
              <Box sx={{ width: 250 }} style={{ padding: 30 }}>
                <Slider
                  min={300}
                  max={20000}
                  getAriaLabel={() => 'Цена'}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
              </Box>
              <NavBarFilters
                isWifi={isWifi}
                seIsWif={seIsWif}
                popular={popular}
                Populars={Populars}
              />
            </Col>
            <Col xl={9}>
              <div className={styles.listLayout}>
                <div className={styles.toolBox}>
                  <div className={styles.sortBox}>
                    <ul className={styles.ulBox}>
                      <li className={styles.label}>Сортировать:</li>
                      {linkMap.map((item, index) => (
                        <button
                          key={index}
                          type="button"
                          className={
                            type === index ? styles.active : styles.link
                          }
                          onClick={() => setType(index)}
                        >
                          {item.title}
                        </button>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.sortBox}>
                    <ul className={styles.ulBox}>
                      {viewBox.map((item, index) => (
                        <>
                          <button
                            key={index}
                            type="button"
                            className={
                              title === index ? styles.active : styles.link
                            }
                            onClick={() => setTitle(index)}
                          >
                            <span className={item.className}></span>
                            {item.title}
                          </button>
                        </>
                      ))}
                    </ul>
                  </div>
                </div>
                {filterActive ? (
                  <>
                    {hotelFtFiltered?.length > 0 ? (
                      <div className={styles.itemContainer}>
                        <ul
                          className={styles.list}
                          style={{ display: title === 0 ? 'flex' : 'block' }}
                        >
                          {hotelFtFiltered.map((item, index) => (
                            <ListHotel key={index} hotel={item} index={index} />
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className={styles.itemContainer}>
                        <ul
                          className={styles.list}
                          style={{ display: title === 0 ? 'flex' : 'block' }}
                        >
                          <h1>
                            По вашему запросу ничего не найденно измените
                            параметры поиска
                          </h1>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {hotels?.length > 0 && (
                      <div className={styles.itemContainer}>
                        <ul
                          className={styles.list}
                          style={{ display: title === 0 ? 'flex' : 'block' }}
                        >
                          {hotels.map((item, index) => (
                            <ListHotel key={index} hotel={item} index={index} />
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}
export default CitiesId
