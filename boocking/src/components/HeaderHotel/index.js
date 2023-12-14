import React from "react";
import { Rating } from 'react-simple-star-rating'
import styles from "../../Pages/HotelId/index.module.scss";
import key from '../../assets/icon/key.png'
import mar from '../../assets/icon/nakarte.png'
import {Link} from "react-router-dom";

function HeaderHotel({hotelId}) {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.headerTitle}>
                    {hotelId.typeHotel}
                </div>
                <Rating
                    initialValue={2.5} SVGstorkeWidth={0}
                />
            </div>
            <div className={`${styles.flex} ${styles.marginBottom}`}>
                <section>
                    <div className={styles.flex}>
                        <span className={styles.nameHotel}>
                            {hotelId.nameHotel}
                        </span>
                        <img src={key} alt={key}/>
                    </div>
                    <div className={styles.flex}>
                        <div className={`${styles.itemAddress}`}>
                            <Link to={'#'} className={`${styles.link} `}>
                                <svg height={28} width={45} className={styles.omMap} focusable="false" aria-hidden="true" fill={'#d9ccf8'}>
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                            </Link>
                            <div className={styles.omMap}>
                                {hotelId.address}
                            </div>
                        </div>
                        <div className={`${styles.itemAddress}`}>
                            <Link to={'#'} className={`${styles.link} `}>
                                <svg height={28} width={45} fill={'#d9ccf8'}
                                     className={styles.omMap}
                                    focusable="false" aria-hidden="true">
                                    <path d="m20.1 7.7-1 1c1.8 1.8 1.8 4.6 0 6.5l1 1c2.5-2.3 2.5-6.1 0-8.5zM18 9.8l-1 1c.5.7.5 1.6 0 2.3l1 1c1.2-1.2 1.2-3 0-4.3zM14 1H4c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 19H4V4h10v16z"/>
                                </svg>
                            </Link>
                            <div className={styles.omMap}>
                                {hotelId.phone}
                            </div>
                        </div>
                    </div>
                    <div className={styles.flex}>
                        <section className={styles.flex}>
                            <svg fill="#D9CCF8" width="25" height="25" focusable="false" viewBox="0 0 24 24">
                                <path d="m1 9 2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8 3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4 2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                            </svg>
                            <div className={styles.service}> WIFI</div>
                        </section>
                        <section className={styles.flex}>
                            <svg fill="#D9CCF8" width="25" height="25" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                <path d="M18 6V4h2V2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14v-2h-4.03c1.23-.91 2.03-2.36 2.03-4v-5H8v5c0 1.64.81 3.09 2.03 4H6V4h2v2c0 .55.45 1 1 1h8c.55 0 1-.45 1-1zm-8 10v-3h6v3c0 1.65-1.35 3-3 3s-3-1.35-3-3z"/>
                                <circle cx="13" cy="9" r="1"/>
                            </svg>
                            <div className={styles.service}> Завтрак</div>
                        </section>
                        <section className={styles.flex}>
                            <svg fill="#D9CCF8" width="25" height="25" focusable="false" viewBox="0 0 24 24">
                                <path d="m10 8-3.25 3.25c.31.12.56.27.77.39.37.23.59.36 1.15.36s.78-.13 1.15-.36c.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.55 0 .78-.13 1.15-.36.12-.07.26-.15.41-.23L10.48 5C8.93 3.45 7.5 2.99 5 3v2.5c1.82-.01 2.89.39 4 1.5l1 1zm12 8.5h-.02.02zm-16.65-1c.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64s1.73-.37 2.18-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64s1.73-.37 2.18-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.06.63 2.16.64v-2c-.55 0-.78-.14-1.15-.36-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.37.23-.6.36-1.15.36s-.78-.14-1.15-.36c-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.37.23-.59.36-1.15.36-.55 0-.78-.14-1.15-.36-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.18.64c-.37.23-.59.36-1.15.36v2c1.11 0 1.73-.37 2.2-.64.37-.23.6-.36 1.15-.36zM18.67 18c-1.11 0-1.73.37-2.18.64-.37.23-.6.36-1.15.36-.55 0-.78-.14-1.15-.36-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.19.64c-.37.23-.59.36-1.15.36s-.78-.13-1.15-.36c-.45-.27-1.07-.64-2.18-.64s-1.73.37-2.19.64c-.37.23-.59.36-1.15.36v2c1.11 0 1.73-.37 2.19-.64.37-.23.6-.36 1.15-.36.55 0 .78.13 1.15.36.45.27 1.07.64 2.18.64s1.73-.37 2.19-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64s1.72-.37 2.18-.64c.37-.23.59-.36 1.15-.36.55 0 .78.14 1.15.36.45.27 1.07.64 2.18.64v-2c-.56 0-.78-.13-1.15-.36-.45-.27-1.07-.64-2.18-.64z"/>
                                <circle cx="16.5" cy="5.5" r="2.5"/>
                            </svg>
                            <div className={styles.service}>  Басейн</div>
                        </section>
                        <section className={styles.flex}>
                            <svg fill="#D9CCF8" width="25" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MailOutlineIcon">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                            </svg>
                            <div className={styles.service}>  {hotelId.email}</div>
                        </section>
                    </div>
                </section>
                <img src={mar} alt={mar} style={{height: '9vh', marginTop: 36}}/>
                <section className={styles.buttonSection} role={"button"}>
                    <div>
                        <div className="c" style={{color: 'rgb(126, 126, 126)', alignItems: 'center', display: "flex"}}>
                            <div className="px-1"
                                 style={{color: 'rgb(126, 126, 126)', fontWeight: 700, fontSize: 20}}>От
                            </div>
                            <div className="c px-1"
                                 style={{color: 'rgb(9,9,9)', fontWeight: "bold", fontSize: 30}}>{hotelId.price}
                            </div>
                            <div className="c px-1"
                                 style={{color: 'rgb(126, 126, 126)', fontWeight: 700, fontSize: 20}}> Р
                            </div>
                            <div className="c px-1"
                                 style={{color: 'rgb(126, 126, 126)', fontWeight: 700, fontSize: 20}}>/
                            </div>
                            <div className="c px-1"
                                 style={{color: 'rgb(126, 126, 126)', fontWeight: 700, fontSize: 20}}> Сутки
                            </div>
                        </div>
                        <div style={{paddingLeft: 15, fontWeight: 500, fontSize: 15}}>
                            забронировать номер
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default HeaderHotel