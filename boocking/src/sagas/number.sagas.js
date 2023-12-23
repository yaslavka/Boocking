import {takeEvery, call, put, all} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import * as ActionTypes from '../constants/number.constants';
import * as actions from '../actions/number.actions';
import * as api from '../api/number.api';

const uploadFromData = (action)=>{
  return new Promise((resolve, reject)=>{
    const formData = new FormData();
    formData.append('file', action.imageHotel);
    formData.append('dataHotel', JSON.stringify({id: action.id}));
    const response = api.numberManagerUploadImage(formData);
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
    const response = api.numberManagerUploadAlbum(formData);
    if (response.message === 'Ошибка загрузки Изображения') {
      reject(response);
    } else {
      resolve(response);
    }
  });
};

export function* numberInfo(action) {
  try {
    const response = yield call(api.numberInfo, action.payload);
    if (response) {
      yield put(actions.numberInfoSuccess(response));
    }
  } catch (error) {
    yield put(actions.numberInfoError(error.message));
    toast.error(error.message);
  }
}

export function* numberManagerInfo() {
  try {
    const response = yield call(api.numberManagerInfo);
    if (response) {
      yield put(actions.numberManagerInfoSuccess(response));
    }
  } catch (error) {
    yield put(actions.numberManagerInfoError(error.message));
    toast.error(error.message);
  }
}

export function* uploadImageNumber(action) {
  try {
    const response = yield call(uploadFromData, action.payload);
    if (response.message === 'Изображение успешно обновленно') {
      toast.success(response.message);
      const number = yield call(api.numberInfo, action.payload.id);
      if (number) {
        yield put(actions.numberInfoSuccess(number));
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
}

export function* uploadAlbumNumber(action) {
  try {
    const response = yield call(uploadAlbumFromData, action.payload);
    if (response.message === 'Изображения успешно добавленны') {
      toast.success(response.message);
      const number = yield call(api.numberInfo, action.payload.id);
      if (number) {
        yield put(actions.numberInfoSuccess(number));
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
}

export function* numberEdit(action) {
  try {
    const res = yield call(api.numberEdit, action.payload);
    if (res) {
      toast.success(res.message);
      const number = yield call(api.numberInfo, action.payload.id);
      if (number) {
        yield put(actions.numberInfoSuccess(number));
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
}

export function* numberAdd(action) {
  try {
    const res = yield call(api.numberAdd, action.payload);
    if (res) {
      toast.success(res.message);
      yield put(actions.numberAddSuccess({id: res.id}));
      const number = yield call(api.numberManagerInfo);
      if (number) {
        yield put(actions.numberManagerInfoSuccess(number));
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
}

export default function* numberInfoSaga() {
  yield all([
    takeEvery(ActionTypes.NUMBER_INFO_REQUEST, numberInfo),
    takeEvery(ActionTypes.NUMBER_MANAGER_REQUEST, numberManagerInfo),
    takeEvery(ActionTypes.UPLOAD_IMAGES_NUMBER_REQUEST, uploadImageNumber),
    takeEvery(ActionTypes.UPLOAD_ALBUM_IMAGES_NUMBER_REQUEST, uploadAlbumNumber),
    takeEvery(ActionTypes.NUMBER_EDIT_REQUEST, numberEdit),
    takeEvery(ActionTypes.NUMBER_ADD_REQUEST, numberAdd),
  ]);
}
