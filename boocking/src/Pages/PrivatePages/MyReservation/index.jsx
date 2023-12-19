import React from "react";
import styles from './myReservation.module.scss'
import {useSelector} from "react-redux";
import ReservationList from "../../../components/ReservationList";
import PrivateNavbar from "../../../components/PrivateNavbar";


function MyReservation() {
    const userInfo = useSelector(state => state.app.user);
    const reservation = useSelector(state => state.reservation.reservation);
    const reservationManager = useSelector(state => state.reservation.reservationManager);
    return (
        <>
            {userInfo && (
                <PrivateNavbar>
                    {userInfo.isAdmin === false && userInfo.isManager === false ? (
                        <>
                            <h1 className={styles.title}>Мои брони/история</h1>
                            {reservation && (
                                <section className={`${styles.fullRow}`}>
                                    <div className={styles.container}>
                                        {reservation.map((item, index)=>(
                                            <ReservationList item={item} key={index} userInfo={userInfo}/>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    ):(
                        <>
                            <h1 className={styles.title}>Брони</h1>
                            {reservationManager && (
                                <section className={styles.fullRow}>
                                    <div className={styles.container}>
                                        {reservationManager.map((item, index)=>(
                                            <ReservationList item={item} key={index} userInfo={userInfo} manager/>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    )}
                </PrivateNavbar>
            )}
        </>
    )
}
export default MyReservation