import React from "react";
import { Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'
import omit from 'lodash-es/omit'
import routesLik from "../../constants/routes.constants";
import RouteWithSubRoutes from "../../components/RouteWithSubRoutes";
import {publicRouteConfig} from "../../routes";

function PublicRoutes() {
    return (
        <Router>
            <Switch>
                {publicRouteConfig.map((route)=>(
                    <RouteWithSubRoutes key={route.id} {...omit(route, 'id')}/>
                ))}
                <Redirect to={routesLik.root}/>
            </Switch>
        </Router>
    )
}
export default PublicRoutes
