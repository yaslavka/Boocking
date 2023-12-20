import {takeEvery, call, put, all} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import * as ActionTypes from '../constants/message.constants';
import * as actions from '../actions/message.actions';
import {socket} from '../api';

const allMessage =(action)=>{
  return new Promise(()=>{
    socket.emit('allMessage', action);
  });
};

const allMessageAdmin =(action)=>{
  return new Promise(()=>{
    socket.emit('allMessageHelp', action);
  });
};

const sendMessage=(action)=>{
  return new Promise(()=>{
    socket.emit('sendMessage', action);
  });
};

const sendMessageAdmin=(action)=>{
  return new Promise(()=>{
    socket.emit('sendMessageAdmin', action);
  });
};

export function* messageInfo(action) {
  try {
    yield call(allMessage, action.payload);
  } catch (error) {
    yield put(actions.messageInfoError(error.message));
    toast.error(error.message);
  }
}

export function* messageAdminInfo(action) {
  try {
    yield call(allMessageAdmin, action.payload);
  } catch (error) {
    yield put(actions.messageAdminInfoError(error.message));
    toast.error(error.message);
  }
}

export function* sendMessagesAdmin(action) {
  try {
    yield call(sendMessageAdmin, action.payload);
  } catch (error) {
    yield put(actions.messageAdminInfoError(error.message));
    toast.error(error.message);
  }
}


export function* sendMessages(action) {
  try {
    yield call(sendMessage, action.payload);
  } catch (error) {
    yield put(actions.messageInfoError(error.message));
    toast.error(error.message);
  }
}

export default function* messageSaga() {
  yield all([
    takeEvery(ActionTypes.MESSAGE_INFO_REQUEST, messageInfo),
    takeEvery(ActionTypes.MESSAGE_ADMIN_INFO_REQUEST, messageAdminInfo),
    takeEvery(ActionTypes.SEND_MESSAGE_ADMIN_REQUEST, sendMessagesAdmin),
    takeEvery(ActionTypes.SEND_MESSAGE_REQUEST, sendMessages),
  ]);
}
