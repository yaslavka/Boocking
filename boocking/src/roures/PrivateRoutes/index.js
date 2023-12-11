import React from "react";
import {BrowserRouter as Router, Redirect, Switch} from "react-router-dom";
import routesLik from "../../constants/routes.constants";
import omit from 'lodash-es/omit'
import RouteWithSubRoutes from "../../components/RouteWithSubRoutes";
import {privateRouteConfig} from "../../routes";
import SocketClient from "../../SocketClient";
import Header from "../../components/Header";
import {Col, Row} from "react-bootstrap";

function PrivateRoutes() {
    return (
        <>
            <SocketClient/>
            <Header/>
            <Router>
                <Switch>
                    <Row>
                        <Col xl={3}>
                            <div>gffhfhfchfvbg</div>
                        </Col>
                        <Col xl={9}>
                            {privateRouteConfig.map((route)=>(
                                <RouteWithSubRoutes key={route.id} {...omit(route, 'id')}/>
                            ))}
                        </Col>
                    </Row>
                    <Redirect to={routesLik.link}/>
                </Switch>
            </Router>
        </>
    )
}
export default PrivateRoutes