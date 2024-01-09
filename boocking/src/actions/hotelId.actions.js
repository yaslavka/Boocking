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

export const uploadImages = (values) => ({
  type: ActionTypes.UPLOAD_IMAGES_REQUEST,
  payload: values,
})
export const hotelAdd = (values) => ({
  type: ActionTypes.HOTEL_ADD_REQUEST,
  payload: values,
})

export const uploadImagesAlbum = (values) => ({
  type: ActionTypes.UPLOAD_ALBUM_REQUEST,
  payload: values,
})
