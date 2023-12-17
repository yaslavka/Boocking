import * as ActionTypes from '../constants/myObject.constants'

export const myObjectInfo = (values) => ({
    type: ActionTypes.MY_OBJECT_INFO_REQUEST,
    payload: values,
})
export const myObjectInfoSuccess = (values) => ({
    type: ActionTypes.MY_OBJECT_INFO_SUCCESS,
    payload: values,

})
export const myObjectInfoError = (error) => ({
    type: ActionTypes.MY_OBJECT_INFO_ERROR,
    payload: error,
})