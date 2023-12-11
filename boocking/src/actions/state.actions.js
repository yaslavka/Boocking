import * as ActionTypes from '../constants/state.constants'

export const navBarVisible =(values)=>({
    type: ActionTypes.NAV_BAR_VISIBLE,
    payload: values,
})