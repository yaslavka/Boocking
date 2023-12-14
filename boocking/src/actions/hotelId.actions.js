import * as ActionTypes from '../constants/hotelId.constants'


export const hotelId = (values) => ({
    type: ActionTypes.HOTEL_ID_REQUEST,
    payload: values,
})
export const hotelIdSuccess = (values) => ({
    type: ActionTypes.HOTEL_ID_SUCCESS,
    payload: values,

})
export const hotelIdError = (error) => ({
    type: ActionTypes.HOTEL_ID_ERROR,
    payload: error,
})
