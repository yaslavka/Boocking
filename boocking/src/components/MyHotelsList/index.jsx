import React from 'react';
import styles from './myHotelsList.module.scss';
import {Col} from 'reactstrap';
import {Link} from 'react-router-dom';

function MyHotelsList({hotel}) {
  return (
    <>
      <Col lg={4} className={styles.list}>
        <Link to={`hotel_edit/${hotel.id}`} className={styles.images_link}>
          <div className={styles.absolute}>
            <div className={`${styles.flex_row} ${styles.padding_horizontal}`}>
              <div className={styles.hashLink}>
                <h1 className={styles.text} >272 Отеля</h1>
              </div>
              <div className={styles.flex_row}>
                <div className={styles.hashLink}>
                  <svg fill="#8000ff"
                    width={20}
                    focusable="false" aria-hidden="true" viewBox="0 0 20 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                  <h1 className={styles.text}>Карта</h1>
                </div>
              </div>
            </div>
            <img
              src={hotel.imageHotel}
              alt={hotel.nameHotel} className={styles.images}/>
            <div className={`${styles.button_pr}`}>
              <svg
                className={`${styles.primary_btn_absolute} ${styles.primary_btn}`}
                width="50" height="7" viewBox="0 0 50 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="-0.00109863" y1="3.25" x2="49.9989" y2="3.25" stroke="#C394E8" strokeWidth="6"/>
              </svg>
              <div
                className={`${styles.primary_btn_absolute} ${styles.primary_btn}`}
                style={{zIndex: 1, color: '#fff'}}>
                {hotel?.nameHotel}
              </div>
            </div>
          </div>
        </Link>
      </Col>
    </>
  );
}
export default MyHotelsList;
