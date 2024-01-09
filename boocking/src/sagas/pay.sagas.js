import { takeEvery, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import * as ActionTypes from '../constants/pay.constants'
import * as actions from '../actions/pay.actions'
import * as api from '../api/pay.api'

export function* payHistory() {
  try {
    const response = yield call(api.payHistory)
    if (response) {
      yield put(actions.payHistorySuccess(response))
    }
  } catch (error) {
    yield put(actions.payHistoryError(error))
    toast.error(error.message)
  }
}

export function* pay(action) {
  try {
    const response = yield call(api.pay, action.payload)
    if (response) {
      yield put(actions.paySuccess(response))
    }
  } catch (error) {
    toast.error(error.message)
  }
}

export function* withdrawal(action) {
  try {
    const response = yield call(api.withdrawal, action.payload)
    if (response) {
      toast.success(response.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

export default function* paySaga() {
  yield all([
    takeEvery(ActionTypes.PAY_HISTORY_REQUEST, payHistory),
    takeEvery(ActionTypes.PAY_REQUEST, pay),
    takeEvery(ActionTypes.WITHDRAWAL_REQUEST, withdrawal),
  ])
}
