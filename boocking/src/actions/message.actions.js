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
