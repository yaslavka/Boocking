import {takeEvery, call, put, all} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import * as ActionTypes from '../constants/hotelId.constants';
import * as actions from '../actions/hotelId.actions';
import * as actionsUser from '../actions/myObject.actions';
import * as api from '../api/hotelId.api';
import * as apiUser from '../api/myObject.api';

const uploadFromData = (action)=>{
  return new Promise((resolve, reject)=>{
    const formData = new FormData();
    formData.append('file', action.imageHotel);
    formData.append('dataHotel', JSON.stringify({id: action.id}));
    const response = api.uploadImages(formData);
    if (response.message === 'Ошибка загрузки Изображения') {
      reject(response);
    } else {
      resolve(response);
    }
  });
};

const uploadAlbumFromData = (action)=>{
  return new Promise((resolve, reject)=>{
    const formData = new FormData();
    action.album.forEach((file)=>{
      formData.append('images', file);
    });
    formData.append('dataHotel', JSON.stringify({id: action.id}));
    const response = api.uploadAlbumImages(formData);
    if (response.message === 'Ошибка загрузки Изображения') {
      reject(response);
    } else {
      resolve(response);
    }
  });
};

export function* hotelId(action) {
  try {
    const response = yield call(api.hotelId, action.payload);
    if (response) {
      yield put(actions.hotelIdSuccess(response));
    }
  } catch (error) {
    yield put(actions.hotelIdError(error.message));
    toast.error(error.message);
  }
}

export function* uploadImages(action) {
  try {
    const response = yield call(uploadFromData, action.payload);
    if (response.message === 'Изображение успешно обновленно') {
      toast.success(response.message);
      const hotelId = yield call(api.hotelId, action.payload.id);
      if (hotelId) {
        yield put(actions.hotelIdSuccess(hotelId));
      }
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    toast.error('Ошибка сервера', error.message);
  }
}

export function* uploadAlbumImag(action) {
  try {
    const response = yield call(uploadAlbumFromData, action.payload);
    if (response.message === 'Изображения успешно добавленны') {
      toast.success(response.message);
      const hotelId = yield call(api.hotelId, action.payload.id);
      if (hotelId) {
        yield put(actions.hotelIdSuccess(hotelId));
      }
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    toast.error('Ошибка сервера', error.message);
  }
}

export function* hotelEdit(action) {
  try {
    const response = yield call(api.hotelEdit, action.payload);
    if (response) {
      toast.success(response.message);
      const hotelId = yield call(api.hotelId, action.payload.id);
      if (hotelId) {
        yield put(actions.hotelIdSuccess(hotelId));
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
}

export function* hotelAdd(action) {
  try {
    const response = yield call(api.hotelAdd, action.payload);
    if (response) {
      toast.success(response.message);
      const user = yield call(apiUser.myObject);
      if (user) {
        yield put(actionsUser.myObjectInfoSuccess(user));
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
}


export default function* hotelIdSaga() {
  yield all([
    takeEvery(ActionTypes.HOTEL_ID_REQUEST, hotelId),
    takeEvery(ActionTypes.UPLOAD_IMAGES_REQUEST, uploadImages),
    takeEvery(ActionTypes.HOTEL_ADD_REQUEST, hotelAdd),
    takeEvery(ActionTypes.HOTEL_ID_EDIT_REQUEST, hotelEdit),
    takeEvery(ActionTypes.UPLOAD_ALBUM_REQUEST, uploadAlbumImag),
  ]);
}
