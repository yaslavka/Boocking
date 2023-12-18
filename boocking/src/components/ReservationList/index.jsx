import React from "react";
import styles from "../../Pages/PrivatePages/MyReservation/myReservation.module.scss";
import {Button, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import tv from '../../assets/icon/tv.png'
import wifi from '../../assets/icon/wifi.png'

function ReservationList({item, manager}) {
    return (
        <>
            <div className={`${styles.roomThumbList1} room-thumb-list-1  hover_zoom bg-white mb-4 shadow`}>
                <Row>
                    <Col xl={4} lg={4} md={5}>
                        <div className={styles.overflowHidden}>
                            <img src={`${process.env.REACT_APP_BASE_AVATAR_URL}/${item?.number.imageNumber}`} alt={''} width={400} height={350}/>
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
                            <div className={`h5 ${styles.forBookPrice}`}>
                                {item.sum}
                                <small> р/сутки </small>
                            </div>
                            <div className={`h5 ${item.payStatus === true ? styles.statusA : styles.statusF}`}>
                                {item.payStatus === true ? 'Оплачен':'Не оплачен'}
                                {item.payStatus === false && (
                                    <div className={`h5 ${styles.forBookPrice}`}>
                                        оплатить
                                    </div>
                                )}
                            </div>
                            {manager ?(
                                <>
                                    {item.payStatus === true ? (
                                        <>

                                        </>
                                    ):(
                                        <Button color={'primary'}>
                                            Оплачено
                                        </Button>
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
                                        <Button color={'primary'}>
                                            Отменить бронь
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default ReservationList