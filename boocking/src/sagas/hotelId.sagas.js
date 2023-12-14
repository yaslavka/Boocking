import { takeEvery, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import * as ActionTypes from '../constants/hotelId.constants'
import * as actions from '../actions/hotelId.actions'
import * as api from '../api/hotelId.api'

export function* hotelId(action) {
    try {
        const response = yield call(api.hotelId, action.payload)
        if (response) {
            yield put(actions.hotelIdSuccess(response))
        }
    } catch (error) {
        yield put(actions.hotelIdError(error.message))
        toast.error(error.message)
    }
}

export default function* hotelIdSaga() {
    yield all([
        takeEvery(ActionTypes.HOTEL_ID_REQUEST, hotelId),
    ])
}