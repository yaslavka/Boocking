import React from "react";
import styles from './profileInfo.module.scss'

function ProfileInfo({userInfo}) {
    return (
        <>
            <div className={styles.profilePages}>
                <div className={styles.profilePagesContainer}>
                    <img src={
                        userInfo.avatar
                            ? `${process.env.REACT_APP_BASE_AVATAR_URL}/${userInfo.avatar}`
                            : 'https://www.w3schools.com/howto/img_avatar.png'
                    } alt={userInfo.first_name}/>
                    <div className={styles.profilePagesInfo}>

                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfileInfo