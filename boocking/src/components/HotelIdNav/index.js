import React from "react";
import styles from "../../Pages/HotelId/index.module.scss";
import {Link} from "react-router-dom";

function HotelIdNav({hotelId}) {
    return (
        <>
            <nav className={styles.navContainer}>
                <ul className={styles.breadcrumbs_list}>
                    <li className={styles.breadcrumb__item}>
                        <Link className={styles.breadcrumb__link} to={'#'}>
                            <span className={styles.breadcrumb__text}>
                                <span className="hidden">➤ </span>
                                {hotelId.nameHotel}
                            </span>
                        </Link>
                    </li>
                    <li className={styles.breadcrumb__separator}>
                        <i className="fa fa-angle-right" aria-hidden="true"> </i>
                    </li>
                    <li className={styles.breadcrumb__item}>
                        <Link className={styles.breadcrumb__link} to={'#'}>
                            <span className={styles.breadcrumb__text}>
                                Росия
                            </span>
                        </Link>
                    </li>
                    <li className={styles.breadcrumb__separator}>
                        <i className="fa fa-angle-right" aria-hidden="true"> </i>
                    </li>
                    <li className={styles.breadcrumb__item}>
                        <Link className={styles.breadcrumb__link} to={'#'}>
                            <span className={styles.breadcrumb__text}>
                                {hotelId.address}
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
export default HotelIdNav