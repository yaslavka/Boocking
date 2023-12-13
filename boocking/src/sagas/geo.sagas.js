import { takeEvery, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import * as ActionTypes from '../constants/geo.constants'
import * as actions from '../actions/geo.actions'
import * as api from '../api/geo.api'

export function* geoInfo() {
    try {
        const response = yield call(api.geoInfo)
        if (response) {
            yield put(actions.geoInfoSuccess(response))
        }
    } catch (error) {
        yield put(actions.geoInfoError(error.message))
        toast.error(error.message)
    }
}
export function* allCitiesInfo() {
    try {
        const response = yield call(api.allCitiesInfo)
        if (response) {
            yield put(actions.allCitiesSuccess(response))
        }
    } catch (error) {
        yield put(actions.allCitiesError(error.message))
        toast.error(error.message)
    }
}
export function* citiesIdInfo(action) {
    try {
        const response = yield call(api.citiesIdInfo, action.payload)
        if (response) {
            yield put(actions.citiesIdSuccess(response))
        }
    } catch (error) {
        yield put(actions.citiesIdError(error.message))
        toast.error(error.message)
    }
}
export default function* geoSaga() {
    yield all([
        takeEvery(ActionTypes.GEO_REQUEST, geoInfo),
        takeEvery(ActionTypes.ALL_CITIES_REQUEST, allCitiesInfo),
        takeEvery(ActionTypes.CITIES_ID_REQUEST, citiesIdInfo),
    ])
}
