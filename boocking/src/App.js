import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actionUserInfo from './actions/app.actions';
import * as actionGeo from './actions/geo.actions';
import * as actionRecommended from './actions/recommended.actions';
import * as actionReservation from './actions/reservation.actions';
import * as messageActions from './actions/message.actions';
import PublicRoutes from './roures/PublicRoutes';
import PrivateRoutes from './roures/PrivateRoutes';
import {socket} from './api';
function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(()=>{
    if (isAuthenticated) {
      dispatch(actionUserInfo.userInfo());
      dispatch(actionReservation.reservation());
      socket.on('allMessageRec', (data) =>{
        dispatch(messageActions.messageInfoSuccess(data));
      });
    }
  }, [dispatch, isAuthenticated, socket]);
  useEffect(()=>{
    dispatch(actionGeo.geoInfo());
    dispatch(actionGeo.allCitiesInfo());
    dispatch(actionRecommended.recommended());
    dispatch(actionRecommended.actions());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <PublicRoutes/>;
  } else {
    return <PrivateRoutes/>;
  }
}

export default App;
