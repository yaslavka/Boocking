import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import socketReducer from "./socket.reducer";
import appReducer from "./app.reducer";
import authReducer from "./auth.reducer";
import stateReducer from "./state.reducer";
import geoReducer from "./geo.reducer";
import recommendedReducer from "./recommended.reducer";
import hotelIdReducer from "./hotelId.reducer";
import reservationReducer from "./reservation.reducer";
import numberInfoReducer from "./number.reducer";
import messagesReducer from "./message.reducer";

const rootReducer = (history) =>
    combineReducers({
        state:stateReducer,
        mySocket:socketReducer,
            messages:messagesReducer,
        auth:authReducer,
        app: appReducer,
            geo:geoReducer,
        recommended:recommendedReducer,
        hotelId:hotelIdReducer,
        reservation:reservationReducer,
        numberInfo:numberInfoReducer,
        router: connectRouter(history),
    })

export default rootReducer