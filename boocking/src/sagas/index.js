import { all } from 'redux-saga/effects'
import authSaga from "./auth.sagas";
import appSaga from "./app.sagas";
import geoSaga from "./geo.sagas";

export default function* rootSaga() {
    yield all([
        authSaga(),
        appSaga(),
        geoSaga()
    ])
}