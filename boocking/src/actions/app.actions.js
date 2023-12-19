import * as ActionTypes from '../constants/app.constants'

/* User Info */
export const userInfo = (values) => ({
    type: ActionTypes.USER_INFO_REQUEST,
    payload: values,
})
export const userInfoSuccess = (values) => ({
    type: ActionTypes.USER_INFO_SUCCESS,
    payload: values,

})
export const userInfoError = (error) => ({
    type: ActionTypes.USER_INFO_ERROR,
    payload: error,
})

export const pages = (values) => ({
    type: ActionTypes.TASK_PAGES,
    payload: values,
})

export const uploadAvatar = (values) => ({
    type: ActionTypes.UPLOAD_AVATAR_REQUEST,
    payload: values,
})
export const uploadAvatarSuccess = (values) => ({
    type: ActionTypes.UPLOAD_AVATAR_SUCCESS,
    payload: values,

})
export const uploadAvatarError = (error) => ({
    type: ActionTypes.UPLOAD_AVATAR_ERROR,
    payload: error,
})