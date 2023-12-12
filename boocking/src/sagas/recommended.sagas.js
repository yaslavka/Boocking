import { takeEvery, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import * as ActionTypes from '../constants/recommended.constants'
import * as actions from '../actions/recommended.actions'
import * as api from '../api/recommended.api'

export function* recommendedInfo() {
    try {
        const response = yield call(api.recommendedInfo)
        if (response) {
            yield put(actions.recommendedSuccess(response))
        }
    } catch (error) {
        yield put(actions.recommendedError(error.message))
        toast.error(error.message)
    }
}

export function* actionsInfo() {
    try {
        const response = yield call(api.actionsInfo)
        if (response) {
            yield put(actions.actionsSuccess(response))
        }
    } catch (error) {
        yield put(actions.actionsError(error.message))
        toast.error(error.message)
    }
}

export default function* recommendedSaga() {
    yield all([
        takeEvery(ActionTypes.RECOMMENDED_REQUEST, recommendedInfo),
        takeEvery(ActionTypes.ACTIONS_REQUEST, actionsInfo),
    ])
}
