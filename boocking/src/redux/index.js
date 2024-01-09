import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import socketReducer from './socket.reducer'
import appReducer from './app.reducer'
import authReducer from './auth.reducer'
import stateReducer from './state.reducer'
import geoReducer from './geo.reducer'
import recommendedReducer from './recommended.reducer'
import hotelIdReducer from './hotelId.reducer'
import reservationReducer from './reservation.reducer'
import numberInfoReducer from './number.reducer'
import messagesReducer from './message.reducer'
import favoritesReducer from './favorites.reducer'
import payReducer from './pay.reducer'
import myObjectReducer from './myObject.reducer'

const rootReducer = (history) =>
  combineReducers({
    state: stateReducer,
    mySocket: socketReducer,
    messages: messagesReducer,
    favorites: favoritesReducer,
    auth: authReducer,
    app: appReducer,
    geo: geoReducer,
    recommended: recommendedReducer,
    hotelId: hotelIdReducer,
    reservation: reservationReducer,
    numberInfo: numberInfoReducer,
    pay: payReducer,
    myObject: myObjectReducer,
    router: connectRouter(history),
  })

export default rootReducer
