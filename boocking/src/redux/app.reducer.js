import * as ActionTypes from '../constants/app.constants'
import * as AuthActionTypes from '../constants/auth.constants'

const initialState = {
    pages: 1,
    user: null,
    loadings: {
        user: false,
    },
    errors: {
        user: null,
    },
}
const appReducer = (state = initialState, action) =>{
    switch (action.type){
        case ActionTypes.USER_INFO_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, user: true },
                errors: { ...state.errors, user: null },
            }
        }
        case ActionTypes.USER_INFO_SUCCESS: {
            const user = action.payload
            return {
                ...state,
                loadings: { ...state.loadings, user: false },
                errors: { ...state.errors, user: null },
                user,
            }
        }
        case ActionTypes.USER_INFO_ERROR: {
            return {
                ...state,
                loadings: { ...state.loadings, user: false },
                errors: { ...state.errors, user: action.payload },
            }
        }
        case ActionTypes.TASK_PAGES: {
            const pages = action.payload
            return {...state, pages: pages}
        }
        case AuthActionTypes.SIGN_OUT_REQUEST:
        case AuthActionTypes.SIGN_OUT_SUCCESS:
        case AuthActionTypes.SIGN_OUT_ERROR: {
            return initialState
        }

        default:
            return state
    }
}
export default appReducer
