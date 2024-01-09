import React from 'react'
import styles from '../../Pages/PrivatePages/MessagePages/messge.module.scss'
import { Avatar } from '@mui/material'

function MessagesDisplay({ authId, msg }) {
  return (
    <>
      {msg.userId !== authId && (
        <div className={`${styles.otherMessages} ${styles.chatRow}`}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Avatar
              src={
                msg.user?.avatar
                  ? `${process.env.REACT_APP_BASE_AVATAR_URL}/${msg.user?.avatar}`
                  : 'https://www.w3schools.com/howto/img_avatar.png'
              }
              size="big-avatar"
            />
            <span>{msg.user.first_name}</span>
          </div>
          <div className={styles.youContent}>
            <div className={styles.otherChatText}>{msg.message}</div>
          </div>
        </div>
      )}
      {msg.userId === authId && (
        <div className={`${styles.youMessages} ${styles.chatRow}`}>
          <div className={styles.youContent}>
            <div className={styles.youChatText}>{msg.message}</div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Avatar
              src={
                msg.user?.avatar
                  ? `${process.env.REACT_APP_BASE_AVATAR_URL}/${msg.user?.avatar}`
                  : 'https://www.w3schools.com/howto/img_avatar.png'
              }
              size="big-avatar"
            />
            <span>{msg.user.first_name}</span>
          </div>
        </div>
      )}
    </>
  )
}
export default MessagesDisplay
