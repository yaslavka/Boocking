import * as ActionTypes from '../constants/recommended.constants'

export const recommended = (values) => ({
    type: ActionTypes.RECOMMENDED_REQUEST,
    payload: values,
})
export const recommendedSuccess = (values) => ({
    type: ActionTypes.RECOMMENDED_SUCCESS,
    payload: values,

})
export const recommendedError = (error) => ({
    type: ActionTypes.RECOMMENDED_ERROR,
    payload: error,
})

export const actions = (values) => ({
    type: ActionTypes.ACTIONS_REQUEST,
    payload: values,
})
export const actionsSuccess = (values) => ({
    type: ActionTypes.ACTIONS_SUCCESS,
    payload: values,

})
export const actionsError = (error) => ({
    type: ActionTypes.ACTIONS_ERROR,
    payload: error,
})