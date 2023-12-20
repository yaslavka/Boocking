import React from 'react';
import styles from '../ListHotel/listHotel.module.scss';
import {Link} from 'react-router-dom';

function NumberList({item}) {
  return (
    <>
      <div className={styles.tbody}>
        <Link className={`${styles.link} ${styles.linkText}`} to={`/number/${item.id}`}>
          {item.nameNumber}
        </Link>
        <div className={`${styles.without}`}>
          <div>
            <span className="fa fa-coffee exclude" aria-hidden="true"/>
                        Без&nbsp;питания&nbsp;
          </div>
          <div>
            <span className="fa fa-wifi exclude" aria-hidden="true"/>
                        Бесплатный&nbsp;Wi-Fi&nbsp;
          </div>
        </div>
        <div className={styles.priceRow}>
          <Link className={`${styles.linkPrice}`} to={`/number/${item.id}`}>
                        От{' '}
            <span className={styles.priceValue}>{item.price}</span>
            {' '} p / Сутки
          </Link>
        </div>
      </div>
    </>
  );
}
export default NumberList;
