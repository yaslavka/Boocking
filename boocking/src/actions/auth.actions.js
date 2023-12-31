import * as ActionTypes from '../constants/auth.constants'
/* Sign In */
export const signIn = (values) => ({
  type: ActionTypes.SIGN_IN_REQUEST,
  payload: values,
})
export const signInSuccess = (values) => ({
  type: ActionTypes.SIGN_IN_SUCCESS,
  payload: values,
})
export const signInError = (error) => ({
  type: ActionTypes.SIGN_IN_ERROR,
  payload: error,
})
/* Sign UP */
export const signUp = (values) => ({
  type: ActionTypes.SIGN_UP_REQUEST,
  payload: values,
})
export const signUpSuccess = (values) => ({
  type: ActionTypes.SIGN_UP_SUCCESS,
  payload: values,
})
export const signUpError = (error) => ({
  type: ActionTypes.SIGN_UP_ERROR,
  payload: error,
})
/* Sign Out */
export const signOut = () => ({ type: ActionTypes.SIGN_OUT_REQUEST })
export const signOutSuccess = () => ({ type: ActionTypes.SIGN_OUT_SUCCESS })
export const signOutError = (error) => ({
  type: ActionTypes.SIGN_OUT_ERROR,
  payload: error,
})
/* Inviter */
export const inviter = (name) => ({
  type: ActionTypes.INVITER_REQUEST,
  payload: name,
})
export const inviterSuccess = (inviter) => ({
  type: ActionTypes.INVITER_SUCCESS,
  payload: inviter,
})
export const inviterError = (error) => ({
  type: ActionTypes.INVITER_ERROR,
  payload: error,
})
export const clearInviter = () => ({ type: ActionTypes.CLEAR_INVITER })
export const loader = (values) => ({
  type: ActionTypes.LOADING_REQUEST,
  payload: values,
})
