import routesLik from "./constants/routes.constants";
import Home from "./Pages/HomePages";
import HotelId from "./Pages/HotelId";
import CitiesId from "./Pages/CitiesId";
import AllCities from "./Pages/AllCities";
import NumbersId from "./Pages/NumbersId";

export const publicRouteConfig = [
    {
        id: 0,
        path: routesLik.root,
        component: Home,
        exact: true,
    },
    {
        id: 1,
        path: routesLik.hotelId,
        component: HotelId,
        exact: true,
    },
    {
        id: 2,
        path: routesLik.citiesId,
        component: CitiesId,
        exact: true,
    },
    {
        id: 3,
        path: routesLik.allCities,
        component: AllCities,
        exact: true,
    },
    {
        id: 4,
        path: routesLik.numbersId,
        component: NumbersId,
        exact: true,
    },
]

export const privateRouteConfig = [
    {
        id: 0,
        path: routesLik.root,
        component: Home,
        exact: true,
    },
    {
        id: 1,
        path: routesLik.hotelId,
        component: HotelId,
        exact: true,
    },
    {
        id: 2,
        path: routesLik.citiesId,
        component: CitiesId,
        exact: true,
    },
    {
        id: 3,
        path: routesLik.allCities,
        component: AllCities,
        exact: true,
    },
    {
        id: 4,
        path: routesLik.numbersId,
        component: NumbersId,
        exact: true,
    },
    {
        id: 5,
        path: routesLik.dashboard,
        component: Home,
        exact: true,
    },
]
