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

export const hotelIdEdit = (values) => ({
    type: ActionTypes.HOTEL_ID_EDIT_REQUEST,
    payload: values,
})
export const hotelIdEditSuccess = (values) => ({
    type: ActionTypes.HOTEL_ID_EDIT_SUCCESS,
    payload: values,

})
export const hotelIdEditError = (error) => ({
    type: ActionTypes.HOTEL_ID_EDIT_ERROR,
    payload: error,
})

export const uploadImages = (values) => ({
    type: ActionTypes.UPLOAD_IMAGES_REQUEST,
    payload: values,
})
export const uploadImagesSuccess = (values) => ({
    type: ActionTypes.UPLOAD_IMAGES_REQUEST,
    payload: values,

})
export const uploadImagesError = (error) => ({
    type: ActionTypes.UPLOAD_IMAGES_REQUEST,
    payload: error,
})