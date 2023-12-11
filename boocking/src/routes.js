import routesLik from "./constants/routes.constants";
import Home from "./Pages/HomePages";

export const publicRouteConfig = [
    {
        id: 0,
        path: routesLik.root,
        component: Home,
        exact: true,
    },
]

export const privateRouteConfig = [
    {
        id: 0,
        path: routesLik.link,
        component: Home,
        exact: true,
    },
    {
        id: 1,
        path: routesLik.dashboard,
        component: Home,
        exact: true,
    },
]
