import React from "react";
import styles from "../../Pages/PrivatePages/MessagePages/messge.module.scss";
import {Link} from "react-router-dom";
import {Avatar} from "@mui/material";

function MessageUserList({user, messages, chat, setUser, left, children}) {
    messages?.reverse()
    return (
        <>
            <div className={left ? styles.messageUserLeft : styles.messageUser}>
                <div className={styles.itemContainer}>
                    <Link to={left ? '#' : `/chat/${chat?.id}`} className={styles.itemContainer} onClick={()=>{!left && setUser(user)}}>
                        <Avatar  src={
                            user?.avatar
                                ? `${process.env.REACT_APP_BASE_AVATAR_URL}/${user?.avatar}`
                                : 'https://www.w3schools.com/howto/img_avatar.png'
                        } size="big-avatar" />
                        <div>
                            <span>
                                {user?.first_name}{' '}{user?.last_name}
                            </span>
                            <small style={{opacity: 0.7}}>
                                <div style={{filter: 'invert(0)'}}>
                                    {messages && messages[0]?.message || ''}
                                </div>
                            </small>
                        </div>
                    </Link>
                </div>
                {children}
            </div>
        </>
    )
}
export default MessageUserList