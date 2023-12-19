import React from "react";
import {Switch, Redirect, BrowserRouter as Router, BrowserRouter} from 'react-router-dom'
import omit from 'lodash-es/omit'
import routesLik from "../../constants/routes.constants";
import RouteWithSubRoutes from "../../components/RouteWithSubRoutes";
import {publicRouteConfig} from "../../routes";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function PublicRoutes() {
    return (
       <>
           <BrowserRouter>
               <Router>
                   <Header/>
                   <Switch>
                       {publicRouteConfig.map((route)=>(
                           <RouteWithSubRoutes key={route.id} {...omit(route, 'id')}/>
                       ))}
                       <Redirect to={routesLik.root}/>
                   </Switch>
                   <Footer/>
               </Router>
           </BrowserRouter>
       </>
    )
}
export default PublicRoutes
