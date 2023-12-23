import routesLik from './constants/routes.constants';
import Home from './Pages/HomePages';
import HotelId from './Pages/HotelId';
import CitiesId from './Pages/CitiesId';
import AllCities from './Pages/AllCities';
import NumbersId from './Pages/NumbersId';
import Dashboard from './Pages/PrivatePages/Dashboard';
import MyReservation from './Pages/PrivatePages/MyReservation';
import MyFavorites from './Pages/PrivatePages/MyFavorites';
import MessagePages from './Pages/PrivatePages/MessagePages';
import MyaHotels from './Pages/PrivatePages/MyaHotels';
import MyaHotelEdit from './Pages/PrivatePages/MyaHotelEdit';
import HelpMessagePages from './Pages/PrivatePages/HelpMessagePages';
import HotelAdd from './Pages/PrivatePages/HotelAdd';
import ReviewPages from './Pages/PrivatePages/ReviewPages';
import EditProfile from './Pages/PrivatePages/EditProfile';
import Wallet from './Pages/PrivatePages/Wallet';
import MyNumbers from './Pages/PrivatePages/MyNumbers';
import MyNumbersEdit from './Pages/PrivatePages/MyNumbersEdit';
import NumberAdd from './Pages/PrivatePages/NumberAdd';

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
];

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
    component: Dashboard,
    exact: true,
  },
  {
    id: 6,
    path: routesLik.myReservation,
    component: MyReservation,
    exact: true,
  },
  {
    id: 7,
    path: routesLik.favorites,
    component: MyFavorites,
    exact: true,
  },
  {
    id: 8,
    path: routesLik.chat,
    component: MessagePages,
    exact: true,
  },
  {
    id: 8,
    path: routesLik.chatId,
    component: MessagePages,
    exact: true,
  },
  {
    id: 9,
    path: routesLik.myHotel,
    component: MyaHotels,
    exact: true,
  },
  {
    id: 10,
    path: routesLik.hotelEitId,
    component: MyaHotelEdit,
    exact: true,
  },
  {
    id: 11,
    path: routesLik.helpChat,
    component: HelpMessagePages,
    exact: true,
  },
  {
    id: 12,
    path: routesLik.helpChatId,
    component: HelpMessagePages,
    exact: true,
  },
  {
    id: 13,
    path: routesLik.hotelAdd,
    component: HotelAdd,
    exact: true,
  },
  {
    id: 14,
    path: routesLik.review,
    component: ReviewPages,
    exact: true,
  },
  {
    id: 15,
    path: routesLik.profileEdit,
    component: EditProfile,
    exact: true,
  },
  {
    id: 16,
    path: routesLik.wallet,
    component: Wallet,
    exact: true,
  },
  {
    id: 17,
    path: routesLik.myHotelAllNumber,
    component: MyNumbers,
    exact: true,
  },
  {
    id: 18,
    path: routesLik.myHotelAddNumberEditId,
    component: MyNumbersEdit,
    exact: true,
  },

  {
    id: 18,
    path: routesLik.myHotelAddNumber,
    component: NumberAdd,
    exact: true,
  },
];
