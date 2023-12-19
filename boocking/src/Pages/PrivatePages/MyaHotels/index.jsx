import React from "react";
import {useSelector} from "react-redux";
import PrivateNavbar from "../../../components/PrivateNavbar";
import styles from './myHotel.module.scss'
import {Row} from "reactstrap";
import MyHotelsList from "../../../components/MyHotelsList";

function MyaHotels() {
    const userInfo = useSelector(state => state.app.user);
    return (
        <>
            <PrivateNavbar>
                {userInfo?.hotel?.length > 0 && (
                    <div className={styles.hotels}>
                        <Row className={styles.row_images}>
                            {userInfo.hotel.map((hotel, index)=>(
                                <MyHotelsList key={index} hotel={hotel}/>
                            ))}
                        </Row>
                    </div>
                )}
            </PrivateNavbar>
        </>
    )
}
export default MyaHotels