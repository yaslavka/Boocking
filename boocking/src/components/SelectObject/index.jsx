import React, {useState} from "react";
import ListHotel from "../ListHotel/ListHotel";
import {Button, Col, Row} from "reactstrap";
import styles from './select.module.scss'
import {Link} from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import LiftingModal from "../LiftingModal";
import HighlightModalModal from "../HighlightModal";
import PremiumModal from "../PremiumModal";
import VipModal from "../VipModal";
ChartJS.register(ArcElement, Tooltip, Legend);

function SelectObject({object, index, reservationManager, userInfo}) {
    const [lifting, setLifting] = useState(false)
    const [highlight, setHighlight] = useState(false)
    const [premium, setPremium] = useState(false)
    const [vip, setVip] = useState(false)
    const liftingPackage = userInfo && userInfo.promotion.length > 0 && userInfo && userInfo.promotion.filter(i=>i.promotion === 'Поднятие')[0]
    const highlightPackage = userInfo && userInfo.promotion.length > 0 && userInfo && userInfo.promotion.filter(i=>i.promotion === 'Выделение')[0]
    const premiumPackage = userInfo && userInfo.promotion.length > 0 && userInfo && userInfo.promotion.filter(i=>i.promotion === 'Премиум')[0]
    const vipPackage = userInfo && userInfo.promotion.length > 0 && userInfo && userInfo.promotion.filter(i=>i.promotion === 'VIP БЛОК')[0]
    //console.log(object?.promotionHotel.filter(i=>i.promotionHotel === 'Поднятие' && i.status === true)[0].daysLeft)

    let liftingServiceRed = object?.promotionHotel.length > 0 && object?.promotionHotel.filter(i=>i.promotionHotel === 'Поднятие' && i?.status === true)[0]?.daysLeft || 100
    let liftingServiceGrey = object?.promotionHotel.length > 0 && object?.promotionHotel.filter(i=>i.promotionHotel === 'Поднятие' && i?.status === true)[0]?.daysHavePassed || 0
    const liftingService = {
        datasets: [
            {
                backgroundColor: ["#e6e6e68a", "#DE3232"],
                data: [liftingServiceRed , liftingServiceGrey ],
            },
        ],
    }
    let highlightGrin = object?.promotionHotel.length > 0 && object?.promotionHotel.filter(i=>i?.promotionHotel === 'Выделение' && i?.status === true)[0]?.daysLeft ? object?.promotionHotel.filter(i=>i?.promotionHotel === 'Выделение' && i?.status === true)[0]?.daysLeft : 100
    let highlightGrey = object?.promotionHotel.length > 0 && object?.promotionHotel.filter(i=>i?.promotionHotel === 'Выделение' && i?.status === true)[0]?.daysHavePassed ? object?.promotionHotel.filter(i=>i?.promotionHotel === 'Выделение' && i?.status === true)[0]?.daysHavePassed : 0
    const highlights = {
        datasets: [
            {
                backgroundColor: ["#e6e6e68a", "#00D66F"],
                data: [highlightGrin , highlightGrey ],
            },
        ],
    };
    let premiumBlue = object?.promotionHotel.length > 0 && object?.promotionHotel.filter(i=>i?.promotionHotel === 'Премиум' && i?.status === true)[0]?.daysLeft ? object?.promotionHotel.filter(i=>i?.promotionHotel === 'Премиум' && i?.status === true)[0]?.daysLeft : 100
    let premiumGrey = object?.promotionHotel.length > 0 && object?.promotionHotel.filter(i=>i?.promotionHotel === 'Премиум' && i?.status === true)[0]?.daysHavePassed ? object?.promotionHotel.filter(i=>i?.promotionHotel === 'Премиум' && i?.status === true)[0]?.daysHavePassed : 0
    const premiums = {
        datasets: [
            {
                backgroundColor: ["#e6e6e68a", "#1380C3"],
                data: [premiumBlue , premiumGrey ],
            },
        ],
    };

    let vipBlockGrey = object?.promotionHotel.length > 0 && object?.promotionHotel.filter(i=>i?.promotionHotel === 'VIP БЛОК' && i?.status === true)[0]?.daysLeft ? object?.promotionHotel.filter(i=>i?.promotionHotel === 'VIP БЛОК' && i?.status === true)[0]?.daysLeft : 100
    let vipBlockV = object?.promotionHotel.length > 0 && object?.promotionHotel.filter(i=>i?.promotionHotel === 'VIP БЛОК' && i?.status === true)[0]?.daysHavePassed ? object?.promotionHotel.filter(i=>i?.promotionHotel === 'VIP БЛОК' && i?.status === true)[0]?.daysHavePassed : 0
    const vipBlock = {
        datasets: [
            {
                backgroundColor: ["#e6e6e68a", "#774AFF"],
                data: [vipBlockGrey , vipBlockV ],
            },
        ],
    };
    return (
        <>
            <Row>
                <Col xl={9}>
                    <ListHotel key={index} hotel={object} index={index}/>
                </Col>
                <Col xl={3}>
                    <div className={styles.colInfoUserHotel}>
                        <h1 className={styles.colInfoUserHotelTitle}>
                            Информация
                        </h1>
                        <div className={styles.info}>
                            Кол-во: {' '}Номеров {' '}{object.number.length}{' '}шт.
                        </div>
                        <div className={styles.info}>
                            Кол-во: {' '}Фото {' '}{object.albumHotel.length}{' '}шт.
                        </div>
                        <div className={styles.info}>
                            Кол-во: {' '}бронуей {' '}{reservationManager?.length>0 ? reservationManager.length : '0' }{' '}шт.
                        </div>
                        <div className={styles.info}>
                            Кол-во: {' '}Отзывов {' '}{object.review.length}{' '}шт.
                        </div>
                        <Link className={styles.profileEdit} to={`/hotel_edit/${object.id}`}>
                            <svg
                                fill="#B19AF2"
                                width={30}
                                viewBox="0 0 24 24"
                            >
                                <path d="M22 24H2v-4h20v4zM13.06 5.19l3.75 3.75L7.75 18H4v-3.75l9.06-9.06zm4.82 2.68-3.75-3.75 1.83-1.83c.39-.39 1.02-.39 1.41 0l2.34 2.34c.39.39.39 1.02 0 1.41l-1.83 1.83z"/>
                            </svg>
                            <div className="profile-pages-info-edit-text">
                                Редактировать
                            </div>
                        </Link>
                    </div>
                </Col>
            </Row>
            <h1 className={styles.titleService}>{'Услуги'}</h1>
            <div className={`${styles.flex} ${styles.wrap}`}>
                <div className={styles.chartContainer}>
                    <Doughnut data={liftingService}  type={'doughnut'}/>
                    <div className={styles.absolute}>
                        <div className={styles.textService}>ПОДНЯТИЕ</div>
                        <div>Осталось</div>
                        <div className={styles.subTextService}>
                            {object?.promotionHotel.length > 0 && object?.promotionHotel.filter(i=>i?.promotionHotel === 'Поднятие' && i?.status === true)[0]?.daysHavePassed
                            ? object?.promotionHotel.length > 0 && object?.promotionHotel.filter(i=>i?.promotionHotel === 'Поднятие' && i?.status === true)[0]?.daysHavePassed : 0} ДНЕЙ</div>
                    </div>
                    <Button color={'primary'} onClick={()=>{setLifting(true)}}>Продлить</Button>
                </div>
                <div className={styles.chartContainer}>
                    <Doughnut data={highlights} type={'doughnut'}/>
                    <div className={styles.absolute}>
                        <div className={styles.textService}>ВЫДЕЛЕНИЕ</div>
                        <div>Осталось</div>
                        <div className={styles.subTextService}>
                            {object?.promotionHotel.length > 0 && object?.promotionHotel.filter(i=>i?.promotionHotel === 'Выделение' && i?.status === true)[0]?.daysHavePassed
                            ? object?.promotionHotel.length > 0 && object?.promotionHotel.filter(i=>i?.promotionHotel === 'Выделение' && i?.status === true)[0]?.daysHavePassed : 0} ДНЕЙ</div>
                    </div>
                    <Button color={'primary'} onClick={()=>{setHighlight(true)}}>Продлить</Button>
                </div>
                <div className={styles.chartContainer}>
                    <Doughnut data={premiums} type={'doughnut'}/>
                    <div className={styles.absolute}>
                        <div className={styles.textService}>ПРЕМИУМ</div>
                        <div>Осталось</div>
                        <div className={styles.subTextService}>
                            {object?.promotionHotel.length > 0 && object?.promotionHotel.filter(i=>i?.promotionHotel === 'Премиум' && i?.status === true)[0]?.daysHavePassed
                            ? object?.promotionHotel.length > 0 && object?.promotionHotel.filter(i=>i?.promotionHotel === 'Премиум' && i?.status === true)[0]?.daysHavePassed : 0} ДНЕЙ</div>
                    </div>
                    <Button color={'primary'} onClick={()=>{setPremium(true)}}>Продлить</Button>
                </div>
                <div className={styles.chartContainer}>
                    <Doughnut data={vipBlock} type={'doughnut'}/>
                    <div className={styles.absolute}>
                        <div className={styles.textService}>VIP БЛОК</div>
                        <div>Осталось</div>
                        <div className={styles.subTextService}>
                            {object?.promotionHotel.length > 0 && object?.promotionHotel.filter(i=>i?.promotionHotel === 'VIP БЛОК' && i?.status === true)[0]?.daysHavePassed
                            ? object?.promotionHotel.length > 0 && object?.promotionHotel.filter(i=>i?.promotionHotel === 'VIP БЛОК' && i?.status === true)[0]?.daysHavePassed : 0} ДНЕЙ</div>
                    </div>
                    <Button color={'primary'} onClick={()=>{setVip(true)}}>Продлить</Button>
                </div>
            </div>
            {lifting && (
                <LiftingModal lifting={lifting} object={object} liftingPackage={liftingPackage} setLifting={setLifting} value/>
            )}
            {highlight && (
                <HighlightModalModal object={object} value highlight={highlight} highlightPackage={highlightPackage} setHighlight={setHighlight}/>
            )}
            {premium && (
                <PremiumModal value object={object} premium={premium} premiumPackage={premiumPackage} setPremium={setPremium}/>
            )}
            {vip && (
                <VipModal setVip={setVip} object={object} value vip={vip} vipPackage={vipPackage}/>
            )}
        </>
    )
}
export default SelectObject