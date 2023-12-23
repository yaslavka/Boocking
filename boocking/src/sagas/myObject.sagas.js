import {takeEvery, call, put, all} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import * as ActionTypes from '../constants/myObject.constants';
import * as actions from '../actions/myObject.actions';
import * as api from '../api/myObject.api';

export function* myObject() {
  try {
    const response = yield call(api.myObject);
    if (response) {
      yield put(actions.myObjectInfoSuccess(response));
    }
  } catch (error) {
    yield put(actions.myObjectInfoError(error));
    toast.error(error.message);
  }
}
export default function* myObjectSaga() {
  yield all([
    takeEvery(ActionTypes.MY_OBJECT_INFO_REQUEST, myObject),
  ]);
}
