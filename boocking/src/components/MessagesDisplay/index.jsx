import React from "react";
import styles from "../../Pages/PrivatePages/MessagePages/messge.module.scss";
import {Avatar} from "@mui/material";

function MessagesDisplay({authId, msg}) {

    return(
        <>
            {
                msg.userId !== authId &&
                <div className={`${styles.otherMessages} ${styles.chatRow}`}>
                    <Avatar  src={
                        msg.users?.avatar
                            ? `${process.env.REACT_APP_BASE_AVATAR_URL}/${msg.users?.avatar}`
                            : 'https://www.w3schools.com/howto/img_avatar.png'
                    } size="big-avatar" />
                </div>
            }
            {
                msg.userId ===  authId &&
                <div className={`${styles.youMessages} ${styles.chatRow}`}>
                    <Avatar  src={
                        msg.user?.avatar
                            ? `${process.env.REACT_APP_BASE_AVATAR_URL}/${msg.users?.avatar}`
                            : 'https://www.w3schools.com/howto/img_avatar.png'
                    } size="big-avatar" />
                </div>
            }
        </>
    )
}
export default MessagesDisplay