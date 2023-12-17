import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Col, Row} from "reactstrap";
import styles from './dashboard.module.scss'
import NavBarDashboard from "../../../components/NavBarDashboard";
import ProfileInfo from "../../../components/ProfileInfo";

function Dashboard() {
    const dispatch = useDispatch()
    const {t} = useTranslation('common')
    const userInfo = useSelector(state => state.app.user);
    const messages = useSelector(state => state.messages.messages)
    const reservation = useSelector(state => state.reservation.reservation);
    const reservationManager = useSelector(state => state.reservation.reservationManager);
    return(
        <>
            {userInfo && (
                <div className={styles.main}>
                    <Row>
                        <Col xl={3} className={styles.navContainer}>
                            <NavBarDashboard reservation={reservation} userInfo={userInfo} messages={messages} reservationManager={reservationManager} t={t}/>
                        </Col>
                        <Col xl={9}>
                            <ProfileInfo userInfo={userInfo}/>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    )
}
export default Dashboard