import React, {useState} from 'react';
import styles from '../../Pages/PrivatePages/MyReservation/myReservation.module.scss';
import {Button, Col, Row} from 'reactstrap';
import confirm from 'reactstrap-confirm';
import {Link} from 'react-router-dom';
import tv from '../../assets/icon/tv.png';
import wifi from '../../assets/icon/wifi.png';
import {useDispatch} from 'react-redux';
import * as reservationActions from '../../actions/reservation.actions';
import * as messageActions from '../../actions/message.actions';
import ModalPay from '../ModalPay';
import {declOfNum} from '../../utils';

function ReservationList({item, manager}) {
  const dispatch = useDispatch();
  const [modalPay, setModalPay]=useState(false);

  const reservationCancel = async ()=>{
    const count = Number(item.sum);
    const result = await confirm({
      title: 'Подтверждение отмены Брони',
      message: `Отмена брони на сумму ${count} ${declOfNum(count, [
        'рубль',
        'Рублей',
        'Рублей',
      ])}`,
      confirmText: `Подтвердить`,
      confirmColor: 'danger',
      cancelText: `Отменить`,
      cancelColor: 'link text-muted',
    });
    if (result) {
      dispatch(reservationActions.reservationCancel({id: item.id}));
    }
  };
  return (
    <>
      <div className={`${styles.roomThumbList1} room-thumb-list-1  hover_zoom bg-white mb-4 shadow`}>
        <Row>
          <Col xl={4} lg={4} md={5}>
            <div className={styles.overflowHidden}>
              <img src={item?.number?.imageNumber} alt={''} width={400} height={350}/>
            </div>
          </Col>
          <Col xl={6} lg={5} md={7}>
            <div className={'py-3 h-100'}>
              <div className={styles.roomInfo}>
                <div className={`${styles.downLineLeft} mb-3`}>
                  <h5 className={styles.titleRoom}>
                    <Link to={`reservation/${item.id}`}>
                      {item?.number.nameNumber}
                    </Link>
                  </h5>
                  <span>{item?.number.typeNumber}</span>
                </div>
                <p>
                  {item?.number.descriptionNumber}
                </p>
                <ul className={styles.icons}>
                  <li><img src={tv} alt={tv}/></li>
                  <li><img src={wifi} alt={tv}/></li>
                  <div className={styles.roomSize}>{item.number.quadrature} кв</div>
                </ul>
              </div>
            </div>
          </Col>
          <Col xl={2} lg={3}>
            <div className={styles.forBook}>
              <h5 className={`${styles.forBookPrice}`}>
                {item.sum}
                <small> р/сутки </small>
              </h5>
              <div className={`${item.payStatus === true ? styles.statusA : styles.statusF}`}>
                {item.payStatus === true ? 'Оплачен':'Не оплачен'}
                {item.payStatus === false && !manager && (
                  <h5 className={`${styles.forBookPrice} ${styles.hover}`} role={'button'} onClick={()=>{
                    setModalPay(true);
                  }}>
                    оплатить
                  </h5>
                )}
              </div>
              {manager ?(
                <>
                  {item.payStatus === true ? (
                    <>
                      <Button color={'primary'}>
                        Оплачен
                      </Button>
                    </>
                  ):(
                    <>
                      <Button color={'primary'} role={'link'} href={`/chat/${item.user.username}`} style={{marginBottom: 10}} onClick={()=>{
                        dispatch(messageActions.user(item.user));
                      }}>
                        Написать Покупателю
                      </Button>
                      <Button style={{width: 190}} color={'primary'} onClick={reservationCancel}>
                        Отменить бронь
                      </Button>
                    </>
                  )}
                </>
              ):(
                <>
                  {item.payStatus === true ? (
                    <>
                      <Button color={'primary'}>
                        Забронитровать повторно
                      </Button>
                    </>
                  ):(
                    <Button color={'primary'} onClick={reservationCancel}>
                      Отменить бронь
                    </Button>
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
      {modalPay && <ModalPay modalPay={modalPay} setModalPay={setModalPay} id={item.id} sum={item.sum}/>}
    </>
  );
}
export default ReservationList;
