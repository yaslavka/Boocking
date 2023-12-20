import {takeEvery, call, put, all} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import * as ActionTypes from '../constants/auth.constants';
import * as actions from '../actions/auth.actions';
import * as api from '../api/auth.api';
import {setAccessToken} from '../utils';


export function* signIn(action) {
  try {
    const response = yield call(api.signIn, action.payload);
    if (response) {
      yield put(actions.signInSuccess(response));
      setAccessToken(response);
    }
  } catch (error) {
    yield put(actions.signInError(error.message));
    toast.error(error.message);
  }
}

export function* signUp(action) {
  try {
    const response = yield call(api.signUp, action.payload);
    if (response) {
      yield put(actions.signUpSuccess(response));
      setAccessToken(response);
    }
  } catch (error) {
    yield put(actions.signUpError(error.message));
    toast.error(error.message);
  }
}
export function* inviter(action) {
  try {
    const response = yield call(api.inviter, action.payload);
    if (response) {
      yield put(actions.inviterSuccess(response));
    }
  } catch (error) {
    yield put(actions.inviterError(error.message));

    toast.error(error.message);
  }
}
export default function* authSaga() {
  yield all([
    takeEvery(ActionTypes.SIGN_IN_REQUEST, signIn),
    takeEvery(ActionTypes.SIGN_UP_REQUEST, signUp),
    takeEvery(ActionTypes.INVITER_REQUEST, inviter),
  ]);
}
