import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as messageActions from './actions/message.actions';
import * as reservationManagerActions from './actions/reservation.actions';
import * as actionFavorite from './actions/favorites.actions';

function SocketClient() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.user);
  const authId = userInfo && userInfo;
  useEffect(()=>{
    if (!authId?.isAdmin) {
      dispatch(messageActions.messageAdminInfo(1));
      dispatch(messageActions.messageInfo(authId?.id));
    } else {
      dispatch(messageActions.messageAdminInfo(authId?.id));
    }
  }, [dispatch, authId?.id, authId?.isAdmin]);

  useEffect(()=>{
    if (authId?.isManager) {
      dispatch(reservationManagerActions.reservationManager());
    }
  }, [dispatch, authId?.isManager]);
  useEffect(()=>{
    dispatch(actionFavorite.favorites());
  }, [dispatch]);

  return (
    <></>
  );
}
export default SocketClient;
