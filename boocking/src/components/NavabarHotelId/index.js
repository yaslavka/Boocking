import React from "react";
import {Map, YMaps} from "@pbe/react-yandex-maps";
import SearchFormHotelId from "../SearchformHotelId";
import styles from "../../Pages/HotelId/index.module.scss";
import RecomendetHotelId from "../RecomendetHotelId";
import banners from "../../assets/body-bg.webp"

function NavBarHotelId() {
    return(
        <>
            <div>
                <SearchFormHotelId/>
                <div className={styles.sidebarSearchForms}>
                    <YMaps>
                        <Map style={{borderWidth: 2, borderColor: '#0d6efd4a', maxWidth: 285, width: '100%', height:500, borderRadius: 10, overflow: "hidden"}}  defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}/>
                    </YMaps>
                </div>
                <div className={styles.sidebarSearch}>
                    <RecomendetHotelId/>
                </div>
                <div className={styles.sidebarSearchForms}>
                    <img src={banners} alt={banners} className={styles.images}/>
                </div>
                <div className={styles.sidebarSearchForms}>
                    <img src={banners} alt={banners} className={styles.images}/>
                </div>
            </div>
        </>
    )
}
export default NavBarHotelId