import React, {useState} from "react";
import styles from './favorites.module.scss'
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {Col, Row} from "reactstrap";
import NavBarDashboard from "../../../components/NavBarDashboard";
import LiftingModal from "../../../components/LiftingModal";
import HighlightModalModal from "../../../components/HighlightModal";
import PremiumModal from "../../../components/PremiumModal";
import VipModal from "../../../components/VipModal";
import PackageModal from "../../../components/PackageModal";
import ListHotel from "../../../components/ListHotel/ListHotel";

function MyFavorites() {
    const {t} = useTranslation('common')
    const userInfo = useSelector(state => state.app.user);
    const messages = useSelector(state => state.messages.messages)
    const reservation = useSelector(state => state.reservation.reservation);
    const reservationManager = useSelector(state => state.reservation.reservationManager);
    const favorites = useSelector(state => state.favorites.favorites);
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
                                        <h1 className={styles.title}>Избранные отели</h1>
                                        {favorites.length > 0 && (
                                            <section className={`${styles.fullRow} bg-white`}>
                                                <div className={styles.container}>
                                                    {favorites.map((item, index)=>(
                                                        <>
                                                            {item.status === true && (
                                                                <ListHotel hotel={item.hotel} index={index} key={index}/>
                                                            )}
                                                        </>
                                                    ))}
                                                </div>
                                            </section>
                                        )}
                                    </>
                                ):(
                                    <>

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
export default MyFavorites