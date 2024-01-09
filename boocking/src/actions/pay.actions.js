import * as ActionTypes from '../constants/pay.constants'

/* Pay Info */
export const pay = (values) => ({
  type: ActionTypes.PAY_REQUEST,
  payload: values,
})
export const paySuccess = (values) => ({
  type: ActionTypes.PAY_REQUEST,
  payload: values,
})
export const payHistory = (values) => ({
  type: ActionTypes.PAY_HISTORY_REQUEST,
  payload: values,
})
export const payHistorySuccess = (values) => ({
  type: ActionTypes.PAY_HISTORY_SUCCESS,
  payload: values,
})
export const payHistoryError = (error) => ({
  type: ActionTypes.PAY_HISTORY_ERROR,
  payload: error,
})

export const withdrawal = (values) => ({
  type: ActionTypes.WITHDRAWAL_REQUEST,
  payload: values,
})
