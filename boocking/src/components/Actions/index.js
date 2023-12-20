import React, {createRef} from 'react';
import Slider from 'react-slick';
import styles from './actions.module.scss';
import {Button} from 'reactstrap';
function Actions({actions, t}) {
  const sliderRef = createRef();

  const settings = {
    infinite: false,
    speed: 300,
    slidesToShow: 3,
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
      <div className={styles.actionsPages}>
        <div>
                    Отдохни с выгодой
        </div>
        <div>
          <h3>{t('АКЦИИ')}</h3>
        </div>
        <div className={styles.actionsContainer}>
          <Slider {...settings} ref={sliderRef}>
            {actions.map((item, index)=>(
              <div key={index} className={styles.actionsWrapperContainer}>
                <div className={styles.actionsContent}>
                  <img src={
                    item.imageHotel
                  }
                  alt={item.nameHotel} className={styles.imageHotel}/>
                  <div className={styles.actionCardsTitle}>
                    <div className={styles.actionCardsTitle}>
                      НАЗВАНИЕ АКЦИИ
                    </div>
                    <div className={styles.actionCardsTitle}>
                      НАЗВАНИЕ АКЦИИ
                    </div>
                  </div>
                  <svg width="300" height="2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="-0.00109863" y1="0.75" x2="325" y2="0.75" stroke="#D9CCF8" strokeOpacity="0.6"/>
                  </svg>
                  <div style={
                    {paddingLeft: 15, fontWeight: 500, marginBottom: 10, alignItems: 'flex-start', textAlign: 'left'}
                  }>
                    {item.nameHotel}
                  </div>
                  <div className={styles.actionAddress}>
                    <svg fill="#D9CCF8"
                      width={24}
                      height={24}
                      focusable="false" aria-hidden="true"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                    <div className={`${styles.actionAddressText} px-1`}>
                      {item.address}
                    </div>
                  </div>
                  <div style={{padding: 10, marginBottom: 10}}>
                    <h1 style={{fontSize: 15, fontWeight: 200, color: '#8c8c8c'}}>
                      оценка: <i style={{fontWeight: 500}}>9,3/10</i> |
                      <i className="fa fa-comment"> </i> Отзывов: 53</h1>
                  </div>
                  <div style={{padding: 20, marginBottom: 10, alignItems: 'flex-start', textAlign: 'left'}}>
                    <Button
                      color="primary"
                      role={'link'}
                      href={`/hotel_hom/${item.id}`}
                      key={item.id}
                      id={item.id}>
                      Перейти
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
export default Actions;
