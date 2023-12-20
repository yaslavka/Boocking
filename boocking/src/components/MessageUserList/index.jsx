import React from 'react';
import styles from '../../Pages/PrivatePages/MessagePages/messge.module.scss';
import {Link} from 'react-router-dom';
import {Avatar} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions/message.actions';

function MessageUserList({user, messages, chat, left, help, children}) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.user);
  console.log(user);
  return (
    <>
      {userInfo.isAdmin ? (
        <div className={left ? styles.messageUserLeft : styles.messageUser}>
          <div className={styles.itemContainer}>
            <Link
              to={left ? '#' : help ? `/help-chat/${chat?.id}`: `/chat/${chat?.id}`}
              className={styles.itemContainer}
              onClick={()=>{
                !left && dispatch(actions.user(user));
              }}>
              <Avatar src={
                  user?.avatar ?
                    `${process.env.REACT_APP_BASE_AVATAR_URL}/${user?.avatar}` :
                    'https://www.w3schools.com/howto/img_avatar.png'
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
      ):(
        <>
          {help ? (
            <>
              <div className={left ? styles.messageUserLeft : styles.messageUser}>
                <div className={styles.itemContainer}>
                  <Link
                    to={left ? '#' : help ? `/help-chat/${chat?.id}`: `/chat/${chat?.id}`}
                    className={styles.itemContainer}
                    onClick={()=>{
                      !left && dispatch(actions.user(user));
                    }}>
                    <Avatar src={'https://www.w3schools.com/howto/img_avatar.png'} size="big-avatar" />
                    <div>
                      <span>
                    Написать в тех потдержку
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
          ):(
            <div className={left ? styles.messageUserLeft : styles.messageUser}>
              <div className={styles.itemContainer}>
                <Link
                  to={left ? '#' : help ? `/help-chat/${chat?.id}`: `/chat/${chat?.id}`}
                  className={styles.itemContainer}
                  onClick={()=>{
                    !left && dispatch(actions.user(user));
                  }}>
                  <Avatar src={
                    user?.avatar ?
                      `${process.env.REACT_APP_BASE_AVATAR_URL}/${user?.avatar}` :
                      'https://www.w3schools.com/howto/img_avatar.png'
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
          )}
        </>
      )}
    </>
  );
}
export default MessageUserList;
