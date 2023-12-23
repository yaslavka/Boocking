import * as ActionTypes from '../constants/number.constants';

export const numberInfo = (values) => ({
  type: ActionTypes.NUMBER_INFO_REQUEST,
  payload: values,
});
export const numberInfoSuccess = (values) => ({
  type: ActionTypes.NUMBER_INFO_SUCCESS,
  payload: values,

});
export const numberInfoError = (error) => ({
  type: ActionTypes.NUMBER_INFO_ERROR,
  payload: error,
});

export const reviewSend = (values) => ({
  type: ActionTypes.REVIEW_SEND_REQUEST,
  payload: values,
});
export const reviewSendSuccess = (values) => ({
  type: ActionTypes.REVIEW_SEND_SUCCESS,
  payload: values,

});
export const reviewSendError = (error) => ({
  type: ActionTypes.REVIEW_SEND_ERROR,
  payload: error,
});


export const numberManagerInfo = (values) => ({
  type: ActionTypes.NUMBER_MANAGER_REQUEST,
  payload: values,
});
export const numberManagerInfoSuccess = (values) => ({
  type: ActionTypes.NUMBER_MANAGER_SUCCESS,
  payload: values,

});
export const numberManagerInfoError = (error) => ({
  type: ActionTypes.NUMBER_MANAGER_ERROR,
  payload: error,
});


export const uploadImages = (values) => ({
  type: ActionTypes.UPLOAD_IMAGES_NUMBER_REQUEST,
  payload: values,
});

export const uploadImagesAlbum = (values) => ({
  type: ActionTypes.UPLOAD_ALBUM_IMAGES_NUMBER_REQUEST,
  payload: values,
});

export const numberIdEdit = (values) => ({
  type: ActionTypes.NUMBER_EDIT_REQUEST,
  payload: values,
});

export const numberAdd = (values) => ({
  type: ActionTypes.NUMBER_ADD_REQUEST,
  payload: values,
});
export const numberAddSuccess = (values) => ({
  type: ActionTypes.NUMBER_ADD_SUCCESS,
  payload: values,

});
export const numberAddError = (error) => ({
  type: ActionTypes.NUMBER_ADD_ERROR,
  payload: error,
});
