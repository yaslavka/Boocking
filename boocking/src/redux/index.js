import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import socketReducer from "./socket.reducer";
import appReducer from "./app.reducer";
import authReducer from "./auth.reducer";
import stateReducer from "./state.reducer";
import geoReducer from "./geo.reducer";

const rootReducer = (history) =>
    combineReducers({
        state:stateReducer,
        mySocket:socketReducer,
        auth:authReducer,
        app: appReducer,
            geo:geoReducer,
        router: connectRouter(history),
    })

export default rootReducer