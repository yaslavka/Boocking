import { takeEvery, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import * as ActionTypes from '../constants/number.constants'
import * as actions from '../actions/number.actions'
import * as api from '../api/number.api'

export function* numberInfo(action) {
    try {
        const response = yield call(api.numberInfo, action.payload)
        if (response) {
            yield put(actions.numberInfoSuccess(response))
        }
    } catch (error) {
        yield put(actions.numberInfoError(error.message))
        toast.error(error.message)
    }
}
export default function* numberInfoSaga() {
    yield all([
        takeEvery(ActionTypes.NUMBER_INFO_REQUEST, numberInfo),
    ])
}
