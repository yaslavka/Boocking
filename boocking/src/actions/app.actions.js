import * as ActionTypes from '../constants/app.constants'

/* User Info */
export const userInfo = (values) => ({
    type: ActionTypes.USER_INFO_REQUEST,
    payload: values,
})
export const userInfoSuccess = (values) => ({
    type: ActionTypes.USER_INFO_SUCCESS,
    payload: values,

})
export const userInfoError = (error) => ({
    type: ActionTypes.USER_INFO_ERROR,
    payload: error,
})

export const reservationInfo = (values) => ({
    type: ActionTypes.RESERVATION_INFO_REQUEST,
    payload: values,
})
export const reservationSuccess = (values) => ({
    type: ActionTypes.RESERVATION_INFO_SUCCESS,
    payload: values,

})
export const reservationError = (error) => ({
    type: ActionTypes.RESERVATION_INFO_ERROR,
    payload: error,
})