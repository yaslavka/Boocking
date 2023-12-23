import React, {useEffect, useState} from 'react';
import styles from './navBarDashboard.module.scss';
import {Link} from 'react-router-dom';
import routesLik from '../../constants/routes.constants';
import * as actions from '../../actions/auth.actions';
import * as objectActions from '../../actions/myObject.actions';
import {useDispatch, useSelector} from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';

function NavBarDashboard({userInfo, reservation, messages, reservationManager, setLifting, setHighlight, setPremium, setPackage, setVip, messagesAdmin}) {
  const dispatch = useDispatch();
  const objects = useSelector((state) => state.myObject.object);
  const [object, setObject] =useState(false);
  const [mySites, setMySites] =useState(false);
  const [promotions, setPromotions] =useState(false);
  const reviewLength = objects && objects[0]?.review;

  useEffect(()=>{
    dispatch(objectActions.myObjectInfo());
  }, [dispatch]);

  const LogOuts = () => {
    dispatch(actions.signOutSuccess());
    localStorage.clear();
    localStorage.removeItem('access_token');
  };

  return (
    <>
      <div className={styles.navContainer}>
        <Link to={routesLik.dashboard} className={styles.navLink}>
          <svg fill="#FFFFFF" width="30" viewBox="0 0 24 24">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
          <div className={styles.navLinkText}>Главная</div>
        </Link>
      </div>
      {userInfo.isManager === false && userInfo.isAdmin === false && (
        <>
          <div className={styles.navContainer}>
            <div className={styles.navLinkFlex}>
              <Link to={routesLik.myReservation} className={styles.navLink}>
                <svg
                  fill="#FFFFFF"
                  width={30}
                  viewBox="0 0 24 24">
                  <path d="M21 10h-8.35C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H13l2 2 2-2 2 2 4-4.04L21 10zM7 15c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
                </svg>
                <div className={styles.navLinkText}>Мои брони</div>
              </Link>
              <div className={styles.navLinkFlexArrow}>
                <div className={styles.navLinkSpan}>
                  <span>{reservation.length>0 ? reservation.filter((item)=>item.status === false).length : '0' }</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.navContainer}>
            <div className={styles.navLinkFlex}>
              <Link to={routesLik.favorites} className={styles.navLink}>
                <svg
                  fill="#FFFFFF"
                  width={30}
                  viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                </svg>
                <div className={styles.navLinkText}>Избранные</div>
              </Link>
            </div>
          </div>
        </>
      )}
      {userInfo.isManager && (
        <>
          <div className={styles.navContainer}>
            <div className={styles.navLinkFlex}>
              <Link to={'#'} className={styles.navLink} onClick={()=>setObject(!object)}>
                <svg
                  fill="#FFFFFF"
                  width={30}
                  viewBox="0 0 24 24">
                  <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                </svg>
                <div className={styles.navLinkText}>Отели</div>
              </Link>
              <div className={styles.navLinkFlexArrow}>
                <div className={styles.navLinkSpan}>
                  <span>{objects && objects?.length}</span>
                </div>
                {!object ? (
                  <svg onClick={()=>setObject(true)}
                    fill="#B29AF0"
                    width={30}
                    viewBox="0 0 24 24">
                    <path d="m7 10 5 5 5-5z"/>
                  </svg>
                ):(
                  <svg
                    onClick={()=>setObject(false)}
                    fill="#B29AF0"
                    width={30}
                    viewBox="0 0 24 24">
                    <path d="m7 14 5-5 5 5z"/>
                  </svg>
                )}
              </div>
            </div>
            {object && (
              <div className={styles.subNav}>
                <div className={styles.subNavLink}><Link to={routesLik.myHotel}>Мои отели</Link></div>
                <div className={styles.subNavLink}><Link to={routesLik.hotelAdd}>Добавить отель</Link></div>
                <div className={styles.subNavLink}><Link to={routesLik.myHotelAddNumber}>Мои номера</Link></div>
                <div className={styles.subNavLink}><Link to={routesLik.myHotelAddNumber}>добавить номера</Link></div>
              </div>
            )}
          </div>
          <div className={styles.navContainer}>
            <div className={styles.navLinkFlex}>
              <Link to={'#'} className={styles.navLink} onClick={()=>setMySites(!mySites)}>
                <svg
                  fill="#FFFFFF"
                  width={30}
                  viewBox="0 0 24 24">
                  <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zM4 14v2h2c0-1.11-.89-2-2-2zm0-3v1.43c1.97 0 3.57 1.6 3.57 3.57H9c0-2.76-2.24-5-5-5zm0-3v1.45c3.61 0 6.55 2.93 6.55 6.55H12c0-4.42-3.59-8-8-8z"/>
                </svg>
                <div className={styles.navLinkText}>Мои сайты</div>
              </Link>
              <div className={styles.navLinkFlexArrow}>
                <div className={styles.navLinkSpan}>
                  <span>{reservation.length>0 ? reservation.filter((item)=>item.status === false).length : '0' }</span>
                </div>
                {!mySites ? (
                  <svg onClick={()=>setMySites(true)}
                    fill="#B29AF0"
                    width={30}
                    viewBox="0 0 24 24">
                    <path d="m7 10 5 5 5-5z"/>
                  </svg>
                ):(
                  <svg
                    onClick={()=>setMySites(false)}
                    fill="#B29AF0"
                    width={30}
                    viewBox="0 0 24 24">
                    <path d="m7 14 5-5 5 5z"/>
                  </svg>
                )}
              </div>
            </div>
            {mySites && (
              <div className={styles.subNav}>
                <div className={styles.subNavLink}><Link to={routesLik.mySites}>Все сайты</Link></div>
                <div className={styles.subNavLink}><Link to={routesLik.addSites}>Добавить сайт</Link></div>
              </div>
            )}
          </div>
          <div className={styles.navContainer}>
            <div className={styles.navLinkFlex}>
              <Link to={routesLik.myReservation} className={styles.navLink}>
                <svg
                  fill="#FFFFFF"
                  width={30}
                  viewBox="0 0 24 24">
                  <path d="M21 10h-8.35C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H13l2 2 2-2 2 2 4-4.04L21 10zM7 15c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
                </svg>
                <div className={styles.navLinkText}>брони</div>
              </Link>
              <div className={styles.navLinkFlexArrow}>
                <div className={styles.navLinkSpan}>
                  <span>{reservationManager?.length>0 ? reservationManager.filter((item)=>item.status === false).length : '0' }</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.navContainer}>
            <div className={styles.navLinkFlex}>
              <Link to={routesLik.review} className={styles.navLink}>
                <svg
                  fill="#FFFFFF"
                  width={30}
                  viewBox="0 0 24 24"
                >
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97c1.31.61 2.75.97 4.29.97 5.52 0 10-4.48 10-10S17.52 2 12 2zm4 11h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/>
                </svg>
                <div className={styles.navLinkText}>Отзывы</div>
              </Link>
              <div className={styles.navLinkFlexArrow}>
                <div className={styles.navLinkSpan}>
                  <span>{reviewLength?.length}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.navContainer}>
            <div className={styles.navLinkFlex}>
              <Link to={'#'} className={styles.navLink} onClick={()=>setPromotions(!promotions)}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#FFFFFF" width="30px" version="1.1" id="Layer_1" viewBox="0 0 512.004 512.004" xmlSpace="preserve">
                  <g>
                    <g>
                      <path d="M136.535,230.403H68.269c-4.71,0-8.533,3.814-8.533,8.533v204.8c0,4.719,3.823,8.533,8.533,8.533h68.267    c4.71,0,8.533-3.814,8.533-8.533v-204.8C145.069,234.218,141.246,230.403,136.535,230.403z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M238.935,153.97h-68.267c-4.514,0-8.175,3.661-8.175,8.166v281.6c0,4.506,3.661,8.166,8.175,8.166h68.267    c4.514,0,8.175-3.661,8.175-8.166v-281.6C247.11,157.631,243.45,153.97,238.935,153.97z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M341.336,196.27h-68.267c-4.71,0-8.533,3.814-8.533,8.533v238.933c0,4.719,3.823,8.533,8.533,8.533h68.267    c4.71,0,8.533-3.814,8.533-8.533V204.803C349.869,200.084,346.046,196.27,341.336,196.27z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M443.735,110.937h-68.267c-4.71,0-8.533,3.814-8.533,8.533v324.267c0,4.719,3.823,8.533,8.533,8.533h68.267    c4.71,0,8.533-3.814,8.533-8.533V119.47C452.269,114.751,448.446,110.937,443.735,110.937z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M409.602,25.603h-51.2c-4.71,0-8.533,3.814-8.533,8.533s3.823,8.533,8.533,8.533h29.184l-81.826,66.961l-97.673-40.704    c-2.79-1.161-5.99-0.759-8.405,1.05l-102.4,76.8c-3.772,2.825-4.531,8.175-1.707,11.938c1.672,2.244,4.241,3.422,6.835,3.422    c1.775,0,3.575-0.555,5.111-1.707l98.5-73.873l97.894,40.789c2.918,1.229,6.255,0.725,8.687-1.263l88.465-72.38v23.1    c0,4.719,3.823,8.533,8.533,8.533s8.533-3.814,8.533-8.533V34.137C418.135,29.418,414.313,25.603,409.602,25.603z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M509.502,471.837l-25.6-25.6c-3.337-3.337-8.73-3.337-12.066,0c-3.337,3.336-3.337,8.73,0,12.066l11.034,11.034H42.669    V29.136L53.702,40.17c1.664,1.664,3.849,2.5,6.033,2.5s4.369-0.836,6.033-2.5c3.336-3.336,3.336-8.73,0-12.066l-25.6-25.6    c-3.336-3.336-8.73-3.336-12.066,0l-25.6,25.6c-3.336,3.337-3.336,8.73,0,12.066c3.337,3.337,8.73,3.337,12.066,0l11.034-11.034    V477.87c0,4.719,3.823,8.533,8.533,8.533h448.734l-11.034,11.034c-3.337,3.337-3.337,8.73,0,12.066    c1.664,1.664,3.849,2.5,6.033,2.5c2.185,0,4.369-0.836,6.033-2.5l25.6-25.6C512.838,480.566,512.838,475.173,509.502,471.837z"/>
                    </g>
                  </g>
                </svg>
                <div className={styles.navLinkText}>Продвижение</div>
              </Link>
              <div className={styles.navLinkFlexArrow}>
                <div>
                  <span>{' '}</span>
                </div>
                {!promotions ? (
                  <svg onClick={()=>setPromotions(true)}
                    fill="#B29AF0"
                    width={30}
                    viewBox="0 0 24 24">
                    <path d="m7 10 5 5 5-5z"/>
                  </svg>
                ):(
                  <svg
                    onClick={()=>setPromotions(false)}
                    fill="#B29AF0"
                    width={30}
                    viewBox="0 0 24 24">
                    <path d="m7 14 5-5 5 5z"/>
                  </svg>
                )}
              </div>
            </div>
            {promotions && (
              <div className={styles.subNav}>
                <div className={styles.subNavLink} onClick={()=>{
                  setLifting(true);
                }}><Link to={'#'}>Поднять</Link></div>
                <div className={styles.subNavLink} onClick={()=>{
                  setHighlight(true);
                }}><Link to={'#'}>Выделить</Link></div>
                <div className={styles.subNavLink} onClick={()=>{
                  setPremium(true);
                }}><Link to={'#'}>Премиум</Link></div>
                <div className={styles.subNavLink} onClick={()=>{
                  setVip(true);
                }}><Link to={'#'}>VIP Блок</Link></div>
                <div className={styles.subNavLink} onClick={()=>{
                  setPackage(true);
                }}><Link to={'#'}>Пакетное размещение</Link></div>
              </div>
            )}
          </div>
        </>
      )}
      {userInfo.isAdmin === true? (
        <>
          <div className={styles.navContainer}>
            <div className={styles.navLinkFlex}>
              <Link to={routesLik.negative} className={styles.navLink}>
                <svg
                  fill="#FFFFFF"
                  width={30}
                  viewBox="0 0 24 24"
                >
                  <circle cx="15.5" cy="9.5" r="1.5"/>
                  <circle cx="8.5" cy="9.5" r="1.5"/>
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-6c-2.33 0-4.32 1.45-5.12 3.5h1.67c.69-1.19 1.97-2 3.45-2s2.75.81 3.45 2h1.67c-.8-2.05-2.79-3.5-5.12-3.5z"/>
                </svg>
                <div className={styles.navLinkText}>Жалобы</div>
              </Link>
              <div className={styles.navLinkFlexArrow}>
                <div className={styles.navLinkSpanNegative}>
                  <span>{messages && messages?.length}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.navContainer}>
            <div className={styles.navLinkFlex}>
              <Link to={routesLik.helpChat} className={styles.navLink}>
                <svg
                  fill="#FFFFFF"
                  width={30}
                  viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/>
                </svg>
                <div className={styles.navLinkText}>Тикеты</div>
              </Link>
              <div className={styles.navLinkFlexArrow}>
                <div className={styles.navLinkSpan}>
                  <span>{messagesAdmin && messagesAdmin?.length}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.navContainer}>
            <div className={styles.navLinkFlex}>
              <Link to={routesLik.users} className={styles.navLink}>
                <svg
                  fill="#FFFFFF"
                  width={30}
                  viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <div className={styles.navLinkText}>Пользователи</div>
              </Link>
            </div>
          </div>
        </>
      ):(
        <>
          <div className={styles.navContainer}>
            <div className={styles.navLinkFlex}>
              <Link to={routesLik.chat} className={styles.navLink}>
                <svg
                  fill="#FFFFFF"
                  width={30}
                  viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/>
                </svg>
                <div className={styles.navLinkText}>Сообщения</div>
              </Link>
              <div className={styles.navLinkFlexArrow}>
                <div className={styles.navLinkSpan}>
                  <span>{messages && messages?.length}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.navContainer}>
            <div className={styles.navLinkFlex}>
              <Link to={routesLik.helpChat} className={styles.navLink}>
                <svg
                  fill="#FFFFFF"
                  width={30}
                  viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/>
                </svg>
                <div className={styles.navLinkText}>Поддержка</div>
              </Link>
              <div className={styles.navLinkFlexArrow}>
                <div className={styles.navLinkSpan}>
                  <span>{messagesAdmin && messagesAdmin?.length}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.navContainer}>
            <Link to={routesLik.wallet} className={styles.navLink}>
              <svg fill="#FFFFFF"
                width={30} viewBox="0 0 24 24">
                <path d='M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z'/>
              </svg>
              <div className={styles.navLinkText}>Балнс</div>
            </Link>
          </div>
        </>
      )}
      <div className={styles.navContainer}>
        <div className={styles.navLinkFlex}>
          <Link to={'#'} className={styles.navLink} onClick={LogOuts}>
            <LogoutIcon sx={{fontSize: 30}}/>
            <div className={styles.navLinkText}>Выход</div>
          </Link>
        </div>
      </div>
    </>
  );
}
export default NavBarDashboard;
