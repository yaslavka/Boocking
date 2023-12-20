import {takeEvery, call, put, all} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import * as ActionTypes from '../constants/reservation.constants';
import * as actions from '../actions/reservation.actions';
import * as api from '../api/reservation.api';


export function* reservation() {
  try {
    const response = yield call(api.reservation);
    if (response) {
      yield put(actions.reservationSuccess(response));
    }
  } catch (error) {
    yield put(actions.reservationError(error.message));
    toast.error(error.message);
  }
}

export function* reservationManager() {
  try {
    const response = yield call(api.reservationManager);
    if (response) {
      yield put(actions.reservationManagerSuccess(response));
    }
  } catch (error) {
    yield put(actions.reservationManagerError(error.message));
    toast.error(error.message);
  }
}

export function* reservationInfo(action) {
  try {
    const response = yield call(api.reservationInfo, action.payload);
    if (response) {
      yield put(actions.reservationInfoSuccess(response));
    }
  } catch (error) {
    yield put(actions.reservationInfoError(error.message));
    toast.error(error.message);
  }
}

export function* reservationId(action) {
  try {
    const response = yield call(api.reservationId, action.payload);
    if (response) {
      yield put(actions.reservationIdSuccess(response));
    }
  } catch (error) {
    yield put(actions.reservationIdError(error.message));
    toast.error(error.message);
  }
}

export function* reservationBook(action) {
  try {
    const response = yield call(api.reservationBook, action.payload);
    if (response) {
      yield put(actions.reservationBookSuccess(response.message));
      toast.error(response.message);
    }
    const reservation = yield call(api.reservation);
    if (reservation) {
      yield put(actions.reservationSuccess(reservation));
    }
  } catch (error) {
    yield put(actions.reservationBookError(error.message));
    toast.error(error.message);
  }
}
export default function* reservationSaga() {
  yield all([
    takeEvery(ActionTypes.RESERVATION_REQUEST, reservation),
    takeEvery(ActionTypes.RESERVATION_MANAGER_REQUEST, reservationManager),
    takeEvery(ActionTypes.RESERVATION_ID_REQUEST, reservationId),
    takeEvery(ActionTypes.RESERVATION_INFO_REQUEST, reservationInfo),
    takeEvery(ActionTypes.RESERVATION_BOOK_REQUEST, reservationBook),
  ]);
}
