import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Col, Row} from "reactstrap";
import styles from './dashboard.module.scss'
import NavBarDashboard from "../../../components/NavBarDashboard";
import ProfileInfo from "../../../components/ProfileInfo";
import {Box, LinearProgress, linearProgressClasses} from "@mui/material";
import { styled } from '@mui/material/styles';
import SelectObject from "../../../components/SelectObject";
import LiftingModal from "../../../components/LiftingModal";
import HighlightModalModal from "../../../components/HighlightModal";
import PremiumModal from "../../../components/PremiumModal";
import VipModal from "../../../components/VipModal";
import PackageModal from "../../../components/PackageModal";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    width:500,
    borderRadius: 5,
    top: 7,
    marginInline:10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

function Dashboard() {
    const dispatch = useDispatch()
    const {t} = useTranslation('common')
    const userInfo = useSelector(state => state.app.user);
    const messages = useSelector(state => state.messages.messages)
    const reservation = useSelector(state => state.reservation.reservation);
    const reservationManager = useSelector(state => state.reservation.reservationManager);
    const [value, setValue] =useState()
    const [valueSlice] =useState(1)
    const [lifting, setLifting] = useState(false)
    const [highlight, setHighlight] = useState(false)
    const [premium, setPremium] = useState(false)
    const [vip, setVip] = useState(false)
    const [packages, setPackages] = useState(false)
    const objectManager = userInfo && userInfo.hotel.slice(0, valueSlice)
    const liftingPackage = userInfo && userInfo.promotion.length > 0 && userInfo && userInfo.promotion.filter(i=>i.promotion === 'Поднятие')[0]
    const highlightPackage = userInfo && userInfo.promotion.length > 0 && userInfo && userInfo.promotion.filter(i=>i.promotion === 'Выделение')[0]
    const premiumPackage = userInfo && userInfo.promotion.length > 0 && userInfo && userInfo.promotion.filter(i=>i.promotion === 'Премиум')[0]
    const vipPackage = userInfo && userInfo.promotion.length > 0 && userInfo && userInfo.promotion.filter(i=>i.promotion === 'VIP БЛОК')[0]
    return(
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
                               <ProfileInfo userInfo={userInfo}/>
                               <div className={styles.selectObject}>
                                   <div className={styles.selectObjectText}>
                                       {userInfo.isManager && (
                                           <>
                                               Мои Отели
                                           </>
                                       )}
                                       {!userInfo.isManager && (
                                           <>
                                               Мои брони
                                           </>
                                       )}
                                   </div>
                                   <div className={styles.selectObjectWrapper}>
                                       <select onChange={(e)=>setValue(JSON.parse(e.target.value))}>
                                           <option disabled defaultValue={'название Отеля'} value='название Отеля'>название Отеля</option>
                                           {userInfo.isManager ? (
                                               <>
                                                   {userInfo.hotel.map((hotel, index)=>(
                                                       <option key={index} id={hotel.id} value={JSON.stringify(hotel)}>{hotel.nameHotel}</option>
                                                   ))}
                                               </>
                                           ):(
                                               <>

                                               </>
                                           )}
                                       </select>
                                   </div>
                               </div>
                               {userInfo.isManager === true && (
                                   <>
                                       <div className={styles.selectObject}>
                                           <div className={styles.selectObjectText}>
                                               процент наполнения:
                                           </div>
                                           <Box sx={{ flexGrow: 1 }} style={{marginBottom: 10}}>
                                               <BorderLinearProgress variant="determinate" value={50} />
                                           </Box>
                                       </div>
                                       {value === undefined ? (
                                           <>
                                               <div className={styles.itemContainer}>
                                                   <ul className={styles.list}>
                                                       {objectManager &&(
                                                           <>
                                                               {objectManager.map((item, index)=>(
                                                                   <SelectObject index={index} object={item} key={index} reservationManager={reservationManager} objectManager={objectManager} userInfo={userInfo}/>
                                                               ))}
                                                           </>
                                                       )}
                                                   </ul>
                                               </div>
                                           </>
                                       ):(
                                           <>
                                               <div className={styles.itemContainer}>
                                                   <ul className={styles.list}>
                                                       <SelectObject object={value} reservationManager={reservationManager} userInfo={userInfo}/>
                                                   </ul>
                                               </div>
                                           </>
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
export default Dashboard