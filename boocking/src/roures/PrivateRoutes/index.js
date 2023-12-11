import React from "react";
import {BrowserRouter as Router, Redirect, Switch} from "react-router-dom";
import routesLik from "../../constants/routes.constants";
import omit from 'lodash-es/omit'
import RouteWithSubRoutes from "../../components/RouteWithSubRoutes";
import {privateRouteConfig} from "../../routes";
import SocketClient from "../../SocketClient";

function PrivateRoutes() {
    return (
        <Router>
            <Switch>
                <SocketClient/>
                {privateRouteConfig.map((route)=>(
                    <RouteWithSubRoutes key={route.id} {...omit(route, 'id')}/>
                ))}
                <Redirect to={routesLik.link} />
            </Switch>
        </Router>
    )
}
export default PrivateRoutes