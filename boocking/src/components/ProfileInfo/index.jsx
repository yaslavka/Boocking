import React from 'react';
import styles from './profileInfo.module.scss';
import {Link} from 'react-router-dom';
import routesLik from '../../constants/routes.constants';

function ProfileInfo({userInfo}) {
  return (
    <>
      <div className={styles.profilePages}>
        <div className={styles.profilePagesContainer}>
          <img src={
                        userInfo.avatar ?
                            `${process.env.REACT_APP_BASE_AVATAR_URL}/${userInfo.avatar}` :
                            'https://www.w3schools.com/howto/img_avatar.png'
          } alt={userInfo.first_name}/>
          <div className={styles.profilePagesInfo}>
            <div className={styles.marginBottom}>Профиль</div>
            <div className={`${styles.profilePagesInfoInner} ${styles.marginBottom}`}>
              <div>{userInfo.first_name}{' '}{userInfo.last_name}</div>
              <div className={styles.profileInfo}>
                <span className="fa fa-phone" aria-hidden="true"/>
              </div>
              <div className={styles.profileInfo}>
                <div>{userInfo.phone}</div>
              </div>
                            |
              <div className={styles.profileInfo}>
                <svg
                  fill="#1380C1"
                  width={30}
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div className={styles.profileInfo}>
                <div>{userInfo.email}</div>
              </div>
                            |
              <div className={styles.profileInfo}>
                <div>Баланс</div>
              </div>
              <div className={styles.profileInfo}>
                <div>{userInfo.balance} р</div>
              </div>
            </div>
            <div className={styles.profileStatus}>
              {userInfo.isAdmin && (
                <button className={styles.profileStatusButton}>Админ</button>
              )}
              {userInfo.isManager && (
                <button className={styles.profileStatusButton}>Менеджер</button>
              )}
              {userInfo.isManager === false && userInfo.isAdmin === false && (
                <button className={styles.profileStatusButton}>Гость</button>
              )}
            </div>
            <div className={styles.profileEdit}>
              <Link to={routesLik.profileEdit}>
                <svg
                  fill="#B19AF2"
                  width={30}
                  viewBox="0 0 24 24"
                >
                  <path d="M22 24H2v-4h20v4zM13.06 5.19l3.75 3.75L7.75 18H4v-3.75l9.06-9.06zm4.82 2.68-3.75-3.75 1.83-1.83c.39-.39 1.02-.39 1.41 0l2.34 2.34c.39.39.39 1.02 0 1.41l-1.83 1.83z"/>
                </svg>
              </Link>
              <Link to={routesLik.profileEdit}>Редактировать</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProfileInfo;
