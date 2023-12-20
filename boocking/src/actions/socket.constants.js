import * as ActionTypes from '../constants/socket.constants';

export const socket = (values) => ({
  type: ActionTypes.SOCKET_REQUEST,
  payload: values,
});
export const socketSuccess = (values) => ({
  type: ActionTypes.SOCKET_SUCCESS,
  payload: values,

});
export const socketError = (error) => ({
  type: ActionTypes.SOCKET_ERROR,
  payload: error,
});
