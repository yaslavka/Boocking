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
    const objectManager = userInfo && userInfo.hotel.slice(0, valueSlice)
    const liftingPackage = userInfo && userInfo.hotel?.promotionHotel > 0 && userInfo && userInfo.hotel.filter(i=>i.promotionHotel === 'Поднятие')[0]
    return(
        <>
            {userInfo && (
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
                                        <option value="" disabled selected hidden>название Отеля</option>
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
                                                                <SelectObject object={item} key={index} reservationManager={reservationManager} objectManager={objectManager}/>
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
                                                    <SelectObject key={value.id} object={value} reservationManager={reservationManager}/>
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </Col>
                    </Row>
                </div>
            )}
            {lifting && (
                <LiftingModal lifting={lifting} liftingPackage={liftingPackage} setLifting={setLifting} objectManager={userInfo.hotel}/>
            )}
        </>
    )
}
export default Dashboard