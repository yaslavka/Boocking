import React from 'react';
import {Button, Col, Row} from 'reactstrap';
import styles from './number.module.scss';
import BroneButton from '../BroneButton';
import tv from '../../assets/icon/tv.png';
import wifi from '../../assets/icon/wifi.png';
import cap from '../../assets/icon/cap.png';
import korona from '../../assets/icon/korona.png';
import smile from '../../assets/icon/smile.png';
import bank from '../../assets/icon/icon-card-or-no-card-21px.png';

function Number({number, broneceng, endDates, startDate, room}) {
  const imagesMap = [
    {
      id: 0,
      imag: tv,
    },
    {
      id: 1,
      imag: wifi,
    },
    {
      id: 2,
      imag: cap,
    },
    {
      id: 3,
      imag: korona,
    },
  ];

  return (
    <>
      <Col xl={9}>
        <div className={styles.numberContainer}>
          <Row className={styles.row}>
            <Col className={styles.col1}>
              <article className={styles.numberImages}>
                <img src={number.imageNumber} alt={number.imageNumber} width={200} height={'auto'}/>
                <div className={styles.nameNumber}>
                  {number.nameNumber}
                  <div className={styles.typeNumber}>
                    {number.typeNumber}
                  </div>
                </div>
              </article>
              <article className={styles.description}>
                <span className={styles.textDescription}>
                  Количество комнат:{' '}
                  <span className={styles.text}>
                    {number.count}
                  </span>
                </span>
                <span className={styles.textDescription}>
                  Квадратура:{' '}
                  <span className={styles.text}>
                    {number.quadrature}
                  </span>
                </span>
                <span className={styles.textDescription}>
                  Кровати:{' '}
                  <span className={styles.text}>
                    {number.sleepingPlaces}
                  </span>
                </span>
                <span className={styles.textDescription}>
                  Гостей:{' '}
                  <span className={styles.text}>
                    {number.guests}
                    <i className="fa fa-info-circle" title="kdskdg"/>
                  </span>
                </span>
                <section className={styles.sectionService}>
                  {imagesMap.map((img)=>(
                    <img src={img.imag} alt={img.imag} key={img.id}/>
                  ))}
                </section>
                <div style={{marginBottom: 20}}>
                  <span style={{fontWeight: 'bold', fontSize: 30}}>{number.price} <span style={{fontWeight: 500, fontSize: 20, color: '#7C7C7C'}}>₽</span> <span style={{fontWeight: 500, fontSize: 20, color: '#7C7C7C'}}>/</span> <span style={{fontWeight: 500, fontSize: 20, color: '#7C7C7C'}}>Сутки</span> </span>
                </div>
              </article>
            </Col>
            <Col className={styles.col2}>
              <article className={styles.service}>
                <img src={smile} alt={smile}/>
                <div className={styles.serviceText}>
                  Полный пансион  влючен
                </div>
              </article>
              <article className={styles.service}>
                <img src={bank} alt={bank}/>
                <div className={styles.serviceText}>
                  Безналичная оплата
                </div>
              </article>
              <Button color="primary" role={'link'} href={`/number/${number.id}`} className={styles.margiB}>
                Обзор номера
              </Button>
              <h3 className={`${styles.margiB} ${styles.buttonText}`}>
                Доступен
              </h3>
            </Col>
          </Row>
        </div>
      </Col>
      <Col xl={3} className={styles.col2}>
        <BroneButton room={room} number={number} key={number.id} broneceng={broneceng} startDate={startDate} endDates={endDates}/>
      </Col>
    </>
  );
}
export default Number;
