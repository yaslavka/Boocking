import React, { useEffect } from 'react';
import { Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import omit from 'lodash-es/omit';
import { Sugar } from 'react-preloaders2';
import { useDispatch, useSelector } from 'react-redux';
import * as loadingActions from '../../actions/auth.actions';
import routesLik from '../../constants/routes.constants';
import RouteWithSubRoutes from '../../components/RouteWithSubRoutes';
import { publicRouteConfig } from '../../routes';
import Header from '../../components/Header';

function PublicRoutes() {
  const dispatch = useDispatch();
  const loadings = useSelector((state) => state.auth.loadings?.loader);
  useEffect(() => {
    dispatch(loadingActions.loader(true));
    setTimeout(() => {
      dispatch(loadingActions.loader(false));
    }, 900);
  }, [dispatch]);
  console.log('loadings', loadings);
  return (
    <>
      <Header />
      <Router>
        <Switch>
          {publicRouteConfig.map((route) => (
            <RouteWithSubRoutes key={route.id} {...omit(route, 'id')} />
          ))}
          <Redirect to={routesLik.root} />
        </Switch>
      </Router>
      <Sugar background={'rgb(60, 172, 254)'} color={`rgb(255, 255, 255)`} />
    </>
  );
}
export default PublicRoutes;
