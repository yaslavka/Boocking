import React, { createRef, useCallback, useState } from 'react'
import styles from './listHotel.module.scss'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import map from '../../assets/ccc.png'
import umbrella from '../../assets/umbrella.png'
import toun from '../../assets/toun.png'
import imag from '../../assets/imag.png'
import tv from '../../assets/icon/tv.png'
import fotbolka from '../../assets/icon/odejda.png'
import cap from '../../assets/icon/cap.png'
import basein from '../../assets/icon/basein.png'
import dockuments from '../../assets/icon/dockuments.png'
import card from '../../assets/icon/card.png'
import korona from '../../assets/icon/korona.png'
import wifi from '../../assets/icon/wifi.png'
import videocam from '../../assets/icon/videocam.png'
import Slider from 'react-slick'
import NumberList from '../NumberList'
import NumberLists from '../NumberLists'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions/favorites.actions'
import { toast } from 'react-toastify'
import { declOfNum } from '../../utils'

function ListHotel({ hotel, index }) {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.app.user)
  const [description, setDescription] = useState(false)
  const favorites = useSelector((state) => state.favorites.favorites)
  const sliderRef = createRef()

  const settings = {
    customPaging: function (i) {
      return (
        <Link to={'#'}>
          {hotel.albumHotel.map((item, index) => (
            <>
              {index === i && (
                <img
                  key={i + 1}
                  src={item.albumHotel}
                  alt={item.albumHotel}
                  height={50}
                  width={50}
                />
              )}
            </>
          ))}
        </Link>
      )
    },

    dots: true,
    dotsClass: 'slick-dots',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  function PrevArrow(props) {
    const { className, onClick } = props
    return (
      <button
        className={`${className} ${styles.sliderLeftArrow}`}
        type="button"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="78"
          height="78"
          viewBox="0 0 78 78"
          fill="none"
        >
          <circle cx="39" cy="27" r="15" fill="#2F5FE3" />
          <path d="M37 23L41 27L37 31" stroke="white" />
        </svg>
      </button>
    )
  }
  function NextArrow(props) {
    const { className, onClick } = props
    return (
      <button
        className={`${className} ${styles.sliderRightArrow}`}
        type="button"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="78"
          height="78"
          viewBox="0 0 78 78"
          fill="none"
        >
          <circle cx="39" cy="27" r="15" fill="#2F5FE3" />
          <path d="M37 23L41 27L37 31" stroke="white" />
        </svg>
      </button>
    )
  }
  const statusFavorites =
    favorites?.length > 0 && favorites.find((item) => item.hotelId === hotel.id)
  const addToFavorite = useCallback(
    (value) => {
      if (userInfo && userInfo.isManager === true) {
        toast.success('Менеджеры не могут добавит отель в избранное')
      } else {
        dispatch(actions.addFavorites({ id: hotel.id, status: value }))
      }
    },
    [dispatch, hotel.id],
  )
  return (
    <>
      <li className={`${styles.item}  ${styles.list}`} key={index}>
        <article className={`${styles.itemInner} ${styles.list}`}>
          <div className={styles.article}>
            <div className={`${styles.itemInnerImages}`}>
              <div className={`${styles.owlCarousel} `}>
                <img
                  src={hotel.imageHotel}
                  alt={hotel.nameHotel}
                  className={styles.images}
                  width={300}
                  height={190}
                />
              </div>
              {statusFavorites?.status === true ? (
                <div
                  className={styles.addToFavoritesStatus}
                  onClick={() => {
                    addToFavorite(false)
                  }}
                >
                  <div className={styles.like} />
                </div>
              ) : (
                <div
                  className={styles.addToFavorites}
                  onClick={() => {
                    addToFavorite(true)
                  }}
                >
                  <div className={styles.like} />
                </div>
              )}
            </div>
            <div
              className={`${styles.itemContent} ${styles.list} ${styles.clearfix}`}
            >
              <div className={styles.itemMeta}>
                <div>
                  <div className={styles.itemMeta}>
                    <div className={`${styles.itemName}`}>
                      <Link
                        to={`/hotel/${hotel.id}`}
                        className={`${styles.itemName} ${styles.list} ${styles.link}`}
                      >
                        <span itemProp="name">{hotel.typeHotel}</span>
                      </Link>
                      <Rating initialValue={2.5} SVGstorkeWidth={0} />
                    </div>
                  </div>
                  <div className={`${styles.itemName} ${styles.itemP}`}>
                    <Link
                      to={`/hotel/${hotel.id}`}
                      className={`${styles.itemName} ${styles.list} ${styles.link}`}
                    >
                      <span itemProp="name">{hotel.nameHotel}</span>
                    </Link>
                    <h1
                      style={{
                        fontSize: 15,
                        fontWeight: 200,
                        color: '#8c8c8c',
                        width: 450,
                      }}
                    >
                      оценка: <i style={{ fontWeight: 500 }}>{hotel.bal}/10</i>{' '}
                      | <i className="fa fa-comment"> </i> Отзывов:{' '}
                    </h1>
                  </div>
                </div>
                <img src={map} alt="" />
              </div>
              <div className={`${styles.itemAddress}`}>
                <Link to={'#'} className={`${styles.link} `}>
                  <svg
                    height={28}
                    width={45}
                    className={styles.omMap}
                    focusable="false"
                    aria-hidden="true"
                    fill={'#d9ccf8'}
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </Link>
                <div className={styles.omMap}>{hotel.address}</div>
              </div>
              <div className={`${styles.distance} ${styles.clearfix}`}>
                <div className={styles.distance}>
                  <img src={umbrella} alt="" />
                  <div className={styles.distanceText}>
                    Расстояние до пляжа {hotel.distanceTo} М
                  </div>
                </div>
                <div className={styles.distance}>
                  <img src={toun} alt="" />
                  <div className={styles.distanceText}>
                    Расстояние до центра {hotel.distanceCenter} м
                  </div>
                </div>
                <div className={styles.distance}>
                  <img src={imag} alt="" />
                  <div className={styles.distanceText}>
                    Расстояние до вокзала {hotel.distanceRailwayStation} м
                  </div>
                </div>
              </div>
              <div>
                <ul className={styles.itemServices}>
                  <li className={styles.itemServices}>
                    <img src={tv} alt={tv} />
                  </li>
                  <li className={styles.itemServices}>
                    <img src={fotbolka} alt={fotbolka} />
                  </li>
                  <li className={styles.itemServices}>
                    <img src={cap} alt={fotbolka} />
                  </li>
                  <li className={styles.itemServices}>
                    <img src={basein} alt={fotbolka} />
                  </li>
                  <li className={styles.itemServices}>
                    <img src={dockuments} alt={fotbolka} />
                  </li>
                  <li className={styles.itemServices}>
                    <img src={card} alt={fotbolka} />
                  </li>
                  <li className={styles.itemServices}>
                    <img src={korona} alt={fotbolka} />
                  </li>
                  <li className={styles.itemServices}>
                    <img src={wifi} alt={fotbolka} />
                  </li>
                  <li className={styles.itemServices}>
                    <img src={videocam} alt={fotbolka} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.table}>
            <div className={styles.tbody}>
              <Link
                className={`${styles.link} ${styles.linkText}`}
                to={`/hotel/${hotel.id}`}
              >
                {hotel.typeOfRooms}
              </Link>
              <div className={`${styles.without}`}>
                <div>
                  <span className="fa fa-coffee exclude" aria-hidden="true" />
                  Без&nbsp;питания&nbsp;
                </div>
                <div>
                  <span className="fa fa-wifi exclude" aria-hidden="true" />
                  Бесплатный&nbsp;Wi-Fi&nbsp;
                </div>
              </div>
              <div className={styles.priceRow}>
                <Link
                  className={`${styles.linkPrice}`}
                  to={`/hotel/${hotel.id}`}
                >
                  От <span className={styles.priceValue}>{hotel.price}</span> p
                  / Сутки
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.table}>
            <div className={styles.tbody}>
              <div
                className={styles.toggleRoomDescription}
                onClick={() => setDescription(!description)}
              >
                <div>Описание и фото</div>
                <div
                  className={
                    description ? 'fa fa-arrow-up' : 'fa fa-arrow-down'
                  }
                  aria-hidden="true"
                />
              </div>
              <div className={styles.toggleRoomDescription2}>
                {`${declOfNum(hotel.number?.length, [
                  'Остался',
                  'Осталось',
                  'Осталось',
                ])}`}{' '}
                {hotel.number?.length}{' '}
                {`${declOfNum(hotel.number?.length, [
                  'Номер',
                  'Номера',
                  'Номеров',
                ])}`}
              </div>
            </div>
            {description && (
              <>
                <div className={styles.table}>
                  <div className={styles.hotelDescription}>
                    {hotel?.albumHotel?.length > 0 && (
                      <>
                        <div className={styles.hotelAlbumContainer}>
                          <section className={styles.albumPhoto}>
                            <Slider {...settings} ref={sliderRef}>
                              {hotel.albumHotel.map((img, index) => (
                                <>
                                  <img
                                    key={index}
                                    src={img.albumHotel}
                                    alt={img.albumHotel}
                                    className={styles.albumHotel}
                                    width={500}
                                    height={300}
                                  />
                                </>
                              ))}
                            </Slider>
                          </section>
                        </div>
                      </>
                    )}
                    {hotel.descriptionHotel && (
                      <li className={styles.descriptionHotel}>
                        {hotel.descriptionHotel}
                      </li>
                    )}
                  </div>
                </div>
                {hotel?.number?.length > 0 && (
                  <>
                    {hotel.number.map((item, index) => (
                      <>
                        <div className={styles.table}>
                          <NumberList item={item} key={index} />
                        </div>
                        <NumberLists item={item} key={index} />
                      </>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </article>
      </li>
    </>
  )
}
export default ListHotel
