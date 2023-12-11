import React from "react";
import styles from './header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import * as navbarActions from '../../actions/state.actions'
function Header() {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const navbarVisible = useSelector((state) => state.state.navbarVisible)
    const userInfo = useSelector(state => state.app.user);
    const navBarActive =()=>{
        if (navbarVisible === true){
            dispatch(navbarActions.navBarVisible(false))
        }else {
            dispatch(navbarActions.navBarVisible(true))
        }
    }
    return (
        <>
            <div className={styles.header}>
                <div className={styles.inner}>
                    <div role={"button"} className={navbarVisible ? `${styles.button} ${styles.menu} ${styles.pull_left} ${styles.active}`: `${styles.button} ${styles.menu} ${styles.pull_left}`} onClick={navBarActive}>
                        <svg
                            width={40} height={40}
                            focusable="false"  viewBox="0 0 24 24"
                            fill="#0094FF">
                            <path d="M21 11.01 3 11v2h18zM3 16h12v2H3zM21 6H3v2.01L21 8z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header