import * as ActionTypes from '../constants/number.constants'

export const numberInfo = (values) => ({
    type: ActionTypes.NUMBER_INFO_REQUEST,
    payload: values,
})
export const numberInfoSuccess = (values) => ({
    type: ActionTypes.NUMBER_INFO_SUCCESS,
    payload: values,

})
export const numberInfoError = (error) => ({
    type: ActionTypes.NUMBER_INFO_ERROR,
    payload: error,
})

export const reviewSend = (values) => ({
    type: ActionTypes.REVIEW_SEND_REQUEST,
    payload: values,
})
export const reviewSendSuccess = (values) => ({
    type: ActionTypes.REVIEW_SEND_SUCCESS,
    payload: values,

})
export const reviewSendError = (error) => ({
    type: ActionTypes.REVIEW_SEND_ERROR,
    payload: error,
})