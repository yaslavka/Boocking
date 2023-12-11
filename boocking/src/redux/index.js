import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import socketReducer from "./socket.reducer";
import appReducer from "./app.reducer";
import authReducer from "./auth.reducer";

const rootReducer = (history) =>
    combineReducers({
        mySocket:socketReducer,
        auth:authReducer,
        app: appReducer,
        router: connectRouter(history),
    })

export default rootReducer