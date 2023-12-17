import React from "react";
import styles from './header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import * as headerActions from '../../actions/state.actions'
//import * as actions from '../../actions/auth.actions'
import {Link} from "react-router-dom";
import logo from "../../assets/logo/photo_2023-02-22_23-34-15.png";
import {useTranslation} from "react-i18next";
import routesLik from "../../constants/routes.constants";
import ModalBrone from "../ModalBrone";
import ModalAuth from "../ModalAuth";
function Header() {
    const dispatch = useDispatch()
    const {t} = useTranslation('common')
    const navbarVisible = useSelector((state) => state.state.navbarVisible)
    const bronVisible = useSelector((state) => state.state.bronVisible)
    const authVisible = useSelector((state) => state.state.authVisible)
    const userInfo = useSelector(state => state.app.user);

    // const LogOuts =  () => {
    //     dispatch(actions.signOutSuccess());
    //     localStorage.clear();
    //     localStorage.removeItem('access_token');
    // };

    const navBarActive =()=>{
        if (navbarVisible === true){
            dispatch(headerActions.navBarVisible(false))
        }else {
            dispatch(headerActions.navBarVisible(true))
        }
    }
    const searchBronVisible = ()=>{
        if (bronVisible === true){
            dispatch(headerActions.searchBronVisible(false))
        }else {
            dispatch(headerActions.searchBronVisible(true))
        }
    }
    const modalAuthVisible = ()=>{
        if (authVisible === true){
            dispatch(headerActions.modalAuthVisible(false))
        }else {
            dispatch(headerActions.modalAuthVisible(true))
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
                    <Link to={'/'} className={`${styles.pull_left} ${styles.logo}`}>
                        <img src={logo} className={styles.logo__image} alt={'toboock'}/>
                    </Link>
                </div>
                <div className={styles.auth_styles}>
                    <div className={'dropdown pull-right'} role={"button"} onClick={searchBronVisible}>
                        <div className={`${styles.button}`}>
                            <div className={styles.text}>
                                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 9H5V16H3V9ZM9 9H11V16H9V9ZM20 5L10 0L0 5V7H20V5ZM4.47 5L10 2.24L15.53 5H4.47ZM0 18V20H12.4C12.19 19.36 12.08 18.69 12.04 18H0ZM17 11.26V9H15V12.26L17 11.26ZM18 13L14 15V17.55C14 20.07 15.71 22.43 18 23C20.29 22.43 22 20.07 22 17.55V15L18 13ZM17.28 20L15.25 17.97L16.31 16.91L17.28 17.88L19.69 15.5L20.75 16.56L17.28 20Z" fill="#0094FF"/>
                                </svg>
                                <span className={'px-2'}>
                                    {t('header.bronSearch')}
                                </span>
                            </div>
                        </div>
                    </div>
                    {userInfo ? (
                        <>
                            <Link className={`${styles.account} dropdown pull-right`} to={routesLik.dashboard} >
                                <div className={styles.button}>
                                    <span className={styles.text}>
                                        <img className={styles.avatar} alt={userInfo.fullName} src={
                                            userInfo.avatar
                                                ? `${process.env.REACT_APP_BASE_AVATAR_URL}/${userInfo.avatar}`
                                                : 'https://www.w3schools.com/howto/img_avatar.png'
                                        }/>
                                        <div className="px-2">
                                            {t('header.auth')}
                                        </div>
                                    </span>
                                </div>
                            </Link>
                        </>
                    ):(
                        <>
                            <div className={`${styles.account} dropdown pull-right`} role={"button"} onClick={modalAuthVisible}>
                                <div className={styles.button}>
                                    <span className={styles.text}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill="#0094FF"/>
                                        </svg>
                                        <div className="px-2">
                                            {t('header.auth')}
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {bronVisible && <ModalBrone searchBronVisible={searchBronVisible} bronVisible={bronVisible} t={t}/>}
            {authVisible && <ModalAuth authVisible={authVisible} modalAuthVisible={modalAuthVisible}/>}
        </>
    )
}
export default Header