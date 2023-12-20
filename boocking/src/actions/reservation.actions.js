import * as ActionTypes from '../constants/reservation.constants';

export const reservation = (values) => ({
  type: ActionTypes.RESERVATION_REQUEST,
  payload: values,
});
export const reservationSuccess = (values) => ({
  type: ActionTypes.RESERVATION_SUCCESS,
  payload: values,

});
export const reservationError = (error) => ({
  type: ActionTypes.RESERVATION_ERROR,
  payload: error,
});
export const reservationInfo = (values) => ({
  type: ActionTypes.RESERVATION_INFO_REQUEST,
  payload: values,
});
export const reservationInfoSuccess = (values) => ({
  type: ActionTypes.RESERVATION_INFO_SUCCESS,
  payload: values,

});
export const reservationInfoError = (error) => ({
  type: ActionTypes.RESERVATION_INFO_ERROR,
  payload: error,
});

export const reservationId = (values) => ({
  type: ActionTypes.RESERVATION_ID_REQUEST,
  payload: values,
});
export const reservationIdSuccess = (values) => ({
  type: ActionTypes.RESERVATION_ID_SUCCESS,
  payload: values,

});
export const reservationIdError = (error) => ({
  type: ActionTypes.RESERVATION_ID_ERROR,
  payload: error,
});

export const reservationBook = (values) => ({
  type: ActionTypes.RESERVATION_BOOK_REQUEST,
  payload: values,
});
export const reservationBookSuccess = (values) => ({
  type: ActionTypes.RESERVATION_BOOK_SUCCESS,
  payload: values,

});
export const reservationBookError = (error) => ({
  type: ActionTypes.RESERVATION_BOOK_ERROR,
  payload: error,
});

export const reservationManager = (values) => ({
  type: ActionTypes.RESERVATION_MANAGER_REQUEST,
  payload: values,
});
export const reservationManagerSuccess = (values) => ({
  type: ActionTypes.RESERVATION_MANAGER_SUCCESS,
  payload: values,

});
export const reservationManagerError = (error) => ({
  type: ActionTypes.RESERVATION_MANAGER_ERROR,
  payload: error,
});
