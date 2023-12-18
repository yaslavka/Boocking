import React, {useState} from "react";
import styles from './myReservation.module.scss'
import {Col, Row} from "reactstrap";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import NavBarDashboard from "../../../components/NavBarDashboard";
import LiftingModal from "../../../components/LiftingModal";
import HighlightModalModal from "../../../components/HighlightModal";
import PremiumModal from "../../../components/PremiumModal";
import VipModal from "../../../components/VipModal";
import PackageModal from "../../../components/PackageModal";
import ReservationList from "../../../components/ReservationList";


function MyReservation() {
    const {t} = useTranslation('common')
    const userInfo = useSelector(state => state.app.user);
    const messages = useSelector(state => state.messages.messages)
    const reservation = useSelector(state => state.reservation.reservation);
    const reservationManager = useSelector(state => state.reservation.reservationManager);
    const [lifting, setLifting] = useState(false)
    const [highlight, setHighlight] = useState(false)
    const [premium, setPremium] = useState(false)
    const [vip, setVip] = useState(false)
    const [packages, setPackages] = useState(false)
    const liftingPackage = userInfo && userInfo.promotion.length > 0 && userInfo && userInfo.promotion.filter(i=>i.promotion === 'Поднятие')[0]
    const highlightPackage = userInfo && userInfo.promotion.length > 0 && userInfo && userInfo.promotion.filter(i=>i.promotion === 'Выделение')[0]
    const premiumPackage = userInfo && userInfo.promotion.length > 0 && userInfo && userInfo.promotion.filter(i=>i.promotion === 'Премиум')[0]
    const vipPackage = userInfo && userInfo.promotion.length > 0 && userInfo && userInfo.promotion.filter(i=>i.promotion === 'VIP БЛОК')[0]

    return (
        <>
            {userInfo && (
                <>
                    <div className={styles.main}>
                        <Row>
                            <Col xl={3} className={styles.navContainer}>
                                <NavBarDashboard
                                    reservation={reservation}
                                    userInfo={userInfo}
                                    messages={messages}
                                    reservationManager={reservationManager}
                                    t={t}
                                    setLifting={setLifting}
                                    setHighlight={setHighlight}
                                    setPremium={setPremium}
                                    setVip={setVip}
                                    setPackage={setPackages}
                                />
                            </Col>
                            <Col xl={9}>
                                {userInfo.isAdmin === false && userInfo.isManager === false ? (
                                    <>
                                        <h1 className={styles.title}>Мои брони/история</h1>
                                        {reservation && (
                                            <section className={`${styles.fullRow} bg-white`}>
                                                <div className={styles.container}>
                                                    {reservation.map((item, index)=>(
                                                        <ReservationList item={item} key={index}/>
                                                    ))}
                                                </div>
                                            </section>
                                        )}
                                    </>
                                ):(
                                    <>
                                        <h1 className={styles.title}>Брони</h1>
                                        {reservationManager && (
                                            <div className={styles.container}>
                                                {reservationManager.map((item, index)=>(
                                                    <></>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </Col>
                        </Row>
                    </div>
                    {lifting && (
                        <LiftingModal lifting={lifting} liftingPackage={liftingPackage} setLifting={setLifting} objectManager={userInfo.hotel}/>
                    )}
                    {highlight && (
                        <HighlightModalModal objectManager={userInfo.hotel} highlight={highlight} highlightPackage={highlightPackage} setHighlight={setHighlight}/>
                    )}
                    {premium && (
                        <PremiumModal objectManager={userInfo.hotel} premium={premium} premiumPackage={premiumPackage} setPremium={setPremium}/>
                    )}
                    {vip && (
                        <VipModal setVip={setVip} objectManager={userInfo.hotel} vip={vip} vipPackage={vipPackage}/>
                    )}
                    {packages && (
                        <PackageModal
                            packages={packages}
                            setPackages={setPackages}
                            objectManager={userInfo.hotel}
                            vipPackage={vipPackage}
                            premiumPackage={premiumPackage}
                            highlightPackage={highlightPackage}
                            liftingPackage={liftingPackage}
                        />
                    )}
                </>
            )}
        </>
    )
}
export default MyReservation