import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import * as socketActions from './actions/socket.constants';
import * as actionUserInfo from './actions/app.actions';
import * as actionGeo from './actions/geo.actions';
import * as actionRecommended from './actions/recommended.actions';
import PublicRoutes from './roures/PublicRoutes';
import PrivateRoutes from './roures/PrivateRoutes';
function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(actionUserInfo.userInfo());
      const sockets = io(process.env.REACT_APP_SOCKET_BASE_URL);
      sockets.on('connect', () => {
        dispatch(socketActions.socket(sockets));
      });
    }
  }, [dispatch, isAuthenticated]);
  useEffect(() => {
    dispatch(actionGeo.geoInfo());
    dispatch(actionGeo.allCitiesInfo());
    dispatch(actionRecommended.recommended());
    dispatch(actionRecommended.actions());
  }, [dispatch]);

  if (!isAuthenticated) {
    return (<PublicRoutes />);
  } else {
    return (<PrivateRoutes />);
  }
}

export default App;
