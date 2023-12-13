import React from "react";
import styles from './listHotel.module.scss'
import {Link} from "react-router-dom";
import { Rating } from 'react-simple-star-rating'
import map from '../../assets/ccc.png'
import umbrella from '../../assets/umbrella.png'
import toun from '../../assets/toun.png'
import imag from '../../assets/imag.png'
function ListHotel({hotel, index, setHotelesId}) {
    return (
        <>
            <li className={`${styles.item}  ${styles.list}`} key={index}>
                <article className={`${styles.itemInner} ${styles.list}`}>
                    <div className={`${styles.itemInnerImages}`}>
                        <div className={`${styles.owlCarousel} `}>
                            <img src={`${process.env.REACT_APP_BASE_AVATAR_URL}/${hotel.imageHotel}`} alt={hotel.nameHotel} className={styles.images}/>
                        </div>
                        <div className={styles.addToFavorites} onClick={()=>setHotelesId(hotel.id)}>
                            <div className={styles.like}/>
                        </div>
                    </div>
                    <div className={`${styles.itemContent} ${styles.list} ${styles.clearfix}`}>
                        <div className={styles.itemMeta}>
                            <div>
                                <div className={styles.itemMeta}>
                                    <div className={`${styles.itemName}`}>
                                        <Link to={`/hotel/${hotel.id}`} className={`${styles.itemName} ${styles.list} ${styles.link}`}>
                                            <span itemProp="name">{hotel.typeHotel}</span>
                                        </Link>
                                        <Rating
                                            initialValue={2.5} SVGstorkeWidth={0}
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.itemName} ${styles.itemP}`}>
                                    <Link to={`/hotel/${hotel.id}`} className={`${styles.itemName} ${styles.list} ${styles.link}`}>
                                        <span itemProp="name">{hotel.nameHotel}</span>
                                    </Link>
                                    <h1 style={{fontSize: 15, fontWeight: 200, color: "#8c8c8c", width: 350}}>оценка: <i style={{fontWeight: 500}}>{hotel.bal}/10</i> | <i className="fa fa-comment"> </i> Отзывов: </h1>
                                </div>
                            </div>
                            <img src={map} alt=''/>
                        </div>
                        <div className={`${styles.itemAddress}`}>
                            <Link to={'#'} className={`${styles.link} `}>
                                <svg height={28} width={45} className={styles.omMap} focusable="false" aria-hidden="true" fill={'#d9ccf8'}>
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                            </Link>
                            <div className={styles.omMap}>
                                {hotel.address}
                            </div>
                        </div>
                        <div className={`${styles.distance} ${styles.clearfix}`}>
                            <div className={styles.distance}>
                                <img src={umbrella} alt=''/>
                                <div className={styles.distanceText}>Расстояние до пляжа {hotel.distanceTo} М</div>
                            </div>
                            <div className={styles.distance}>
                                <img src={toun} alt=''/>
                                <div className={styles.distanceText}>Расстояние до центра {hotel.distanceCenter} м</div>
                            </div>
                            <div className={styles.distance}>
                                <img src={imag} alt=''/>
                                <div className={styles.distanceText}>Расстояние до вокзала {hotel.distanceRailwayStation} м</div>
                            </div>
                        </div>
                        <div>gdsd</div>
                    </div>
                </article>
            </li>
        </>
    )
}
export default ListHotel