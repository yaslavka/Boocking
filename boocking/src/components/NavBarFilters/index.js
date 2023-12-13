import React from "react";
import styles from './navBarFilter.module.scss'
import Popular from "../Popular";
function NavBarFilters({isWifi, seIsWif, popular, Populars}) {
    return (
        <>
            <div className={styles.sidebar}>
                <div className={styles.sidebarBox}>
                    <fieldset style={{opacity: 1}}>
                        <div className="set-header">Популярные</div>
                        <div className="set-content">
                            {popular.map((i, index)=>(
                                <Popular
                                    key={index}
                                    i={i}
                                    isWifi={isWifi}
                                    seIsWif={seIsWif} Populars={Populars}
                                />
                            ))}
                        </div>
                    </fieldset>
                </div>
            </div>
        </>
    )
}
export default NavBarFilters