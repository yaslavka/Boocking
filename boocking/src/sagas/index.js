import { all } from 'redux-saga/effects'
import authSaga from './auth.sagas'
import appSaga from './app.sagas'
import geoSaga from './geo.sagas'
import recommendedSaga from './recommended.sagas'
import hotelIdSaga from './hotelId.sagas'
import reservationSaga from './reservation.sagas'
import numberInfoSaga from './number.sagas'
import messageSaga from './message.sagas'
import favoritesSaga from './favorites.sagas'
import paySaga from './pay.sagas'
import myObjectSaga from './myObject.sagas'

export default function* rootSaga() {
  yield all([
    authSaga(),
    appSaga(),
    geoSaga(),
    recommendedSaga(),
    hotelIdSaga(),
    reservationSaga(),
    numberInfoSaga(),
    messageSaga(),
    favoritesSaga(),
    paySaga(),
    myObjectSaga(),
  ])
}
