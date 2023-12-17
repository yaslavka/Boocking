import React from "react";
import {Switch, Redirect, BrowserRouter as Router, BrowserRouter} from 'react-router-dom'
import routesLik from "../../constants/routes.constants";
import omit from 'lodash-es/omit'
import RouteWithSubRoutes from "../../components/RouteWithSubRoutes";
import {privateRouteConfig} from "../../routes";
import SocketClient from "../../SocketClient";
import Header from "../../components/Header";
import {Col, Row} from "react-bootstrap";
import Footer from "../../components/Footer";
import {useSelector} from "react-redux";
import styles from "../../Pages/HomePages/index.module.scss";

function PrivateRoutes() {
    const navbarVisible = useSelector((state) => state.state.navbarVisible)
    return (
        <>
         <BrowserRouter>
             <Router>
                 <SocketClient/>
                 <Header/>
                    <main className={styles.main}>
                        <Row>
                            {navbarVisible && (
                                <Col xl={3} style={{position:"absolute", zIndex:1}}>
                                    <div>gffhfhfchfvbg</div>
                                </Col>
                            )}
                            <Switch>
                                {privateRouteConfig.map((route)=>(
                                    <RouteWithSubRoutes key={route.id} {...omit(route, 'id')}/>
                                ))}
                                <Redirect to={routesLik.root}/>
                            </Switch>
                        </Row>
                    </main>
                 <Footer/>
             </Router>
         </BrowserRouter>
        </>
    )
}
export default PrivateRoutes