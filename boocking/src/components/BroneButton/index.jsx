import React from 'react';
import styles from './reservButton.module.scss';
import moment from 'moment';
import 'moment/locale/ru';
import {Button} from 'react-bootstrap';

function BroneButton({number, broneceng, endDates, startDate, room}) {
  const date = new Date();
  const calendar = new Date(`${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`);
  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.title}>СТОИМОСТЬ {number.price} p / сутки</h1>
        <article className={styles.article}>
          <div className={styles.dateContainer}>
            <div>
                Дата заезда
              <div>
                {moment(startDate || calendar).locale('ru').format('DD MMMM YYYY')}
              </div>
            </div>
            <div>
                Дата выезда
              <div>
                {moment(endDates || calendar).locale('ru').format('DD MMMM YYYY')}
              </div>
            </div>
          </div>
          <h1 style={{color: '#555555', fontWeight: 'bold', fontSize: 12, marginBottom: 20}}>выбрано: {room}  Комнат</h1>
          <h1 style={{color: '#090808', fontWeight: 'bold', fontSize: 33, marginBottom: 30}}>{number.price}
            <span style={{fontWeight: 500, fontSize: 20, color: '#7C7C7C'}}>
                ₽
            </span>
            <span style={{fontWeight: 500, fontSize: 20, color: '#7C7C7C'}}>/</span>
            <span style={{fontWeight: 500, fontSize: 20, color: '#7C7C7C'}}>
                Сутки
            </span>
          </h1>
          <Button style={{backgroundColor: '#774AFF', width: '100%', marginBottom: 20}}
            type="button"
            onClick={()=>broneceng(number.count, number.price, number.id, startDate, endDates)}>
              Забронировать
          </Button>
        </article>
      </section>
    </>
  );
}
export default BroneButton;
