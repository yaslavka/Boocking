import React from "react";
import styles from './favorites.module.scss'
import {useSelector} from "react-redux";
import ListHotel from "../../../components/ListHotel/ListHotel";
import PrivateNavbar from "../../../components/PrivateNavbar";

function MyFavorites() {
    const userInfo = useSelector(state => state.app.user);
    const favorites = useSelector(state => state.favorites.favorites);
    return (
        <>
            {userInfo && (
                <PrivateNavbar>
                    {userInfo.isAdmin === false && userInfo.isManager === false ? (
                        <>
                            <h1 className={styles.title}>Избранные отели</h1>
                            {favorites.length > 0 && (
                                <section className={`${styles.fullRow}`}>
                                    <div className={styles.container}>
                                        {favorites.map((item, index)=>(
                                            <>
                                                {item.status === true && (
                                                    <ListHotel hotel={item.hotel} index={index} key={index}/>
                                                )}
                                            </>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    ):(
                        <>

                        </>
                    )}
                </PrivateNavbar>
            )}
        </>
    )
}
export default MyFavorites