import * as ActionTypes from '../constants/message.constants'

export const messageInfo = (values) => ({
  type: ActionTypes.MESSAGE_INFO_REQUEST,
  payload: values,
})
export const messageInfoSuccess = (values) => ({
  type: ActionTypes.MESSAGE_INFO_SUCCESS,
  payload: values,
})
export const messageInfoError = (error) => ({
  type: ActionTypes.MESSAGE_INFO_ERROR,
  payload: error,
})

export const messageAdminInfo = (values) => ({
  type: ActionTypes.MESSAGE_ADMIN_INFO_REQUEST,
  payload: values,
})
export const messageAdminInfoSuccess = (values) => ({
  type: ActionTypes.MESSAGE_ADMIN_INFO_SUCCESS,
  payload: values,
})
export const messageAdminInfoError = (values) => ({
  type: ActionTypes.MESSAGE_ADMIN_INFO_ERROR,
  payload: values,
})
export const user = (values) => ({
  type: ActionTypes.USER_REQUEST,
  payload: values,
})

export const sendMessage = (values) => ({
  type: ActionTypes.SEND_MESSAGE_REQUEST,
  payload: values,
})

export const sendMessageAdmin = (values) => ({
  type: ActionTypes.SEND_MESSAGE_ADMIN_REQUEST,
  payload: values,
})
