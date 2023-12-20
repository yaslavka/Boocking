import React, {createRef} from 'react';
import Slider from 'react-slick';
import {useSelector} from 'react-redux';
import styles from '../Recommended/recommended.module.scss';
import {Link} from 'react-router-dom';
import mark from '../../assets/icon/nakarte.png';
import {Button} from 'reactstrap';
import keys from '../../assets/hotel/iconmonstr-key-thin.svg';

function RecomendetHotelId() {
  const recommended = useSelector((state)=>state.recommended.recommended);
  const sliderRef = createRef();
  const settings = {
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 490,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <>
      {recommended && (
        <div className={styles.pages_recomendet}>
          <Slider {...settings} ref={sliderRef}>
            {recommended.map((item, index)=>(
              <div className={styles.container} key={index}>
                <div className={styles.content}>
                  <img src={`${process.env.REACT_APP_BASE_AVATAR_URL}/${item.imageHotel}`} alt={item.nameHotel} className={styles.imageHotel}/>
                  <div className={styles.typeHotel}>
                    <div className={styles.typeHotelText}>{item.typeHotel}</div>
                    <div className="items-center flex-row flex justify-between">
                      <svg
                        width={20} fill="#FBBF00"
                        focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                        data-testid="StarPurple500OutlinedIcon">
                        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/>
                      </svg>
                      <svg
                        width={20} fill="#FBBF00"
                        focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                        data-testid="StarPurple500OutlinedIcon">
                        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/>
                      </svg>
                      <svg
                        width={20} fill="#FBBF00"
                        focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                        data-testid="StarPurple500OutlinedIcon">
                        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/>
                      </svg>
                      <svg
                        width={20} fill="#FBBF00"
                        focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                        data-testid="StarPurple500OutlinedIcon">
                        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/>
                      </svg>
                      <svg
                        width={20} fill="#FBBF00"
                        focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                        data-testid="StarPurple500OutlinedIcon">
                        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/>
                      </svg>
                    </div>
                  </div>
                  <div className={styles.typeHotel}>
                    <div className={styles.typeHotelText}>{item.nameHotel}</div>
                  </div>
                  <h1 className={styles.ocenka}>
                                        оценка: <i className={styles.fontWeight}>{item.bal}/10</i> | <i className="fa fa-comment"/> Отзывов: 53
                  </h1>
                </div>
                <div className={styles.wraper_bottom}>
                  <div className={styles.wraper}>
                    <div className={styles.wraper}>
                      <svg fill="#D9CCF8"
                        width={15}
                        focusable="false" viewBox="0 0 24 24">
                        <path d="m1 9 2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8 3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4 2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                      </svg>
                      <div className={`${styles.text} px-1`}>{' '}WIFI</div>
                    </div>
                    <div className={styles.wraper}>
                      <svg
                        fill="#D9CCF8"
                        width={15}
                        focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                        <path d="M18 6V4h2V2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14v-2h-4.03c1.23-.91 2.03-2.36 2.03-4v-5H8v5c0 1.64.81 3.09 2.03 4H6V4h2v2c0 .55.45 1 1 1h8c.55 0 1-.45 1-1zm-8 10v-3h6v3c0 1.65-1.35 3-3 3s-3-1.35-3-3z"/>
                        <circle cx="13" cy="9" r="1"/>
                      </svg>
                      <div className={`${styles.text} px-1`}>Завтрак</div>
                    </div>
                    <div className={styles.wraper}>
                      <svg
                        fill="#D9CCF8"
                        width={15} height={15}
                        focusable="false" viewBox="0 0 24 24">
                        <path d="m10 8-3.25 3.25c.31.12.56.27.77.39.37.23.59.36 1.15.36s.78-.13 1.15-.36c.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.55 0 .78-.13 1.15-.36.12-.07.26-.15.41-.23L10.48 5C8.93 3.45 7.5 2.99 5 3v2.5c1.82-.01 2.89.39 4 1.5l1 1zm12 8.5h-.02.02zm-16.65-1c.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64s1.73-.37 2.18-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64s1.73-.37 2.18-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.06.63 2.16.64v-2c-.55 0-.78-.14-1.15-.36-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.37.23-.6.36-1.15.36s-.78-.14-1.15-.36c-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.37.23-.59.36-1.15.36-.55 0-.78-.14-1.15-.36-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.37.23-.59.36-1.15.36v2c1.11 0 1.73-.37 2.2-.64.37-.23.6-.36 1.15-.36zM18.67 18c-1.11 0-1.73.37-2.18.64-.37.23-.6.36-1.15.36-.55 0-.78-.14-1.15-.36-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.19.64c-.37.23-.59.36-1.15.36s-.78-.13-1.15-.36c-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.19.64c-.37.23-.59.36-1.15.36v2c1.11 0 1.73-.37 2.19-.64.37-.23.6-.36 1.15-.36.55 0 .78.13 1.15.36.45.27 1.07.64 2.18.64s1.73-.37 2.19-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64s1.72-.37 2.18-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64v-2c-.56 0-.78-.13-1.15-.36-.45-.27-1.07-.64-2.18-.64z"/>
                        <circle cx="16.5" cy="5.5" r="2.5"/>
                      </svg>
                      <div className={`${styles.text} px-1`}>{' '}Басейн</div>
                    </div>
                  </div>
                </div>
                <div className={styles.address_container}>
                  <div className={styles.address_text}>
                    <svg fill="#D9CCF8"
                      width={20}
                      focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                    <div className={styles.address}>
                      {item.address}
                    </div>
                  </div>
                  <div>
                    <Link to={'#'}>
                      <img src={mark} alt={mark}/>
                    </Link>
                  </div>
                </div>
                <div className={styles.distance_pges}>
                  <div className={styles.distance}>
                    <div className={`${styles.distance} px-1`}>До пляжа:</div>{' '}{item.distanceTo} М.
                  </div>
                  <div className={styles.distance}>
                    <div className={`${styles.distance} px-1`}>До центра:</div>{' '}{item.distanceCenter} М.
                  </div>
                </div>
                <div className={styles.price_container}>
                  <div style={{fontSize: 20, color: '#7E7E7E', fontWeight: 'bold'}}>
                                        От <span style={{fontSize: 25, fontWeight: 900, color: '#050505', alignItems: 'center'}}>{item.price}</span> <span>₽</span><span className="px-2">/</span><span>Сутки</span>
                  </div>
                </div>
                <div className={styles.button_container}>
                  <div className={styles.icons_container}>
                    <Button color="primary" href={`/hotel_hom/${item.id}`}>
                                            перейти
                    </Button>
                    <div className={styles.icons}>
                      <svg fill="#D6D6D6"
                        width={30} height={30}
                        aria-hidden="true" viewBox="0 0 24 24"
                      >
                        <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <img src={keys} alt={keys}/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}
export default RecomendetHotelId;
