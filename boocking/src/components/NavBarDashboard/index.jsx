import React, {useState} from "react";
import styles from './navBarDashboard.module.scss'
import {Link} from "react-router-dom";
import routesLik from "../../constants/routes.constants";

function NavBarDashboard({userInfo, reservation, messages}) {
    const [object, setObject] =useState(false)
    const [mySites, setMySites] =useState(false)
    console.log(reservation && reservation)
    return (
        <>
            <div className={styles.navContainer}>
                <Link to={routesLik.dashboard} className={styles.navLink}>
                    <svg fill="#FFFFFF" width="30" viewBox="0 0 24 24">
                        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                    </svg>
                    <div className={styles.navLinkText}>Главная</div>
                </Link>
            </div>
            {userInfo.isManager && (
                <div className={styles.navContainer}>
                    <div className={styles.navLinkFlex}>
                        <Link to={'#'} className={styles.navLink} onClick={()=>setObject(!object)}>
                            <svg
                                fill="#FFFFFF"
                                width={30}
                                viewBox="0 0 24 24">
                                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                            </svg>
                            <div className={styles.navLinkText}>Отели</div>
                        </Link>
                        <div className={styles.navLinkFlexArrow}>
                            <div className={styles.navLinkSpan}>
                                <span>{userInfo.hotel.length}</span>
                            </div>
                            {!object ? (
                                <svg onClick={()=>setObject(true)}
                                     fill="#B29AF0"
                                     width={30}
                                     viewBox="0 0 24 24">
                                    <path d="m7 10 5 5 5-5z"/>
                                </svg>
                            ):(
                                <svg
                                    onClick={()=>setObject(false)}
                                    fill="#B29AF0"
                                    width={30}
                                    viewBox="0 0 24 24">
                                    <path d="m7 14 5-5 5 5z"/>
                                </svg>
                            )}
                        </div>
                    </div>
                    {object && (
                        <div className={styles.subNav}>
                            <div className={styles.subNavLink}><Link to={routesLik.myHotel}>Мои отели</Link></div>
                            <div className={styles.subNavLink}><Link to={routesLik.hotelAdd}>Добавить отель</Link></div>
                            <div className={styles.subNavLink}><Link to={routesLik.hotelEit}>Редактировать отель</Link></div>
                            <div className={styles.subNavLink}><Link to={routesLik.myHotelAddNumber}>Мои номера</Link></div>
                            <div className={styles.subNavLink}><Link to={routesLik.myHotelAddNumberEdit}>Редактировать номера</Link></div>
                            <div className={styles.subNavLink}><Link to={routesLik.myHotelAddNumber}>добавить номера</Link></div>
                        </div>
                    )}
                </div>
            )}
            {userInfo.isManager && (
                <div className={styles.navContainer}>
                    <div className={styles.navLinkFlex}>
                        <Link to={'#'} className={styles.navLink} onClick={()=>setMySites(!mySites)}>
                            <svg
                                fill="#FFFFFF"
                                width={30}
                                viewBox="0 0 24 24">
                                <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zM4 14v2h2c0-1.11-.89-2-2-2zm0-3v1.43c1.97 0 3.57 1.6 3.57 3.57H9c0-2.76-2.24-5-5-5zm0-3v1.45c3.61 0 6.55 2.93 6.55 6.55H12c0-4.42-3.59-8-8-8z"/>
                            </svg>
                            <div className={styles.navLinkText}>Мои сайты</div>
                        </Link>
                        <div className={styles.navLinkFlexArrow}>
                            <div className={styles.navLinkSpan}>
                                <span>{reservation.length>0 ? reservation.filter(item=>item.status === false).length : '0' }</span>
                            </div>
                            {!mySites ? (
                                <svg onClick={()=>setMySites(true)}
                                     fill="#B29AF0"
                                     width={30}
                                     viewBox="0 0 24 24">
                                    <path d="m7 10 5 5 5-5z"/>
                                </svg>
                            ):(
                                <svg
                                    onClick={()=>setMySites(false)}
                                    fill="#B29AF0"
                                    width={30}
                                    viewBox="0 0 24 24">
                                    <path d="m7 14 5-5 5 5z"/>
                                </svg>
                            )}
                        </div>
                    </div>
                    {mySites && (
                        <div className={styles.subNav}>
                            <div className={styles.subNavLink}><Link to={routesLik.mySites}>Все сайты</Link></div>
                            <div className={styles.subNavLink}><Link to={routesLik.addSites}>Добавить сайт</Link></div>
                        </div>
                    )}
                </div>
            )}
            {userInfo.isManager === false && userInfo.isAdmin === false && (
                <div className={styles.navContainer}>
                    <div className={styles.navLinkFlex}>
                        <Link to={'#'} className={styles.navLink} onClick={()=>setMySites(!mySites)}>
                            <svg
                                fill="#FFFFFF"
                                width={30}
                                viewBox="0 0 24 24">
                                <path d="M21 10h-8.35C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H13l2 2 2-2 2 2 4-4.04L21 10zM7 15c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
                            </svg>
                            <div className={styles.navLinkText}>Мои брони</div>
                        </Link>
                        <div className={styles.navLinkFlexArrow}>
                            <div className={styles.navLinkSpan}>
                                <span>{reservation.length>0 ? reservation.filter(item=>item.status === false).length : '0' }</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {userInfo.isManager && (
                <div className={styles.navContainer}>
                    <div className={styles.navLinkFlex}>
                        <Link to={'#'} className={styles.navLink} onClick={()=>setMySites(!mySites)}>
                            <svg
                                fill="#FFFFFF"
                                width={30}
                                viewBox="0 0 24 24"
                            >
                                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97c1.31.61 2.75.97 4.29.97 5.52 0 10-4.48 10-10S17.52 2 12 2zm4 11h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/>
                            </svg>
                            <div className={styles.navLinkText}>Мои брони</div>
                        </Link>
                        <div className={styles.navLinkFlexArrow}>
                            <div className={styles.navLinkSpan}>
                                <span>{reservation.length>0 ? reservation.filter(item=>item.status === false).length : '0' }</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default NavBarDashboard