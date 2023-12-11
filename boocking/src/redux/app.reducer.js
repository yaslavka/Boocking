import * as ActionTypes from '../constants/app.constants'
import * as AuthActionTypes from '../constants/auth.constants'

const initialState = {
    user: null,
    reservation:null,
    loadings: {
        user: false,
        reservation:false,
    },
    errors: {
        user: null,
        reservation:null
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
        case ActionTypes.RESERVATION_INFO_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, reservation: true },
                errors: { ...state.errors, reservation: null },
            }
        }
        case ActionTypes.RESERVATION_INFO_SUCCESS: {
            const reservation = action.payload
            return {
                ...state,
                loadings: { ...state.loadings, reservation: false },
                errors: { ...state.errors, reservation: null },
                reservation,
            }
        }
        case ActionTypes.RESERVATION_INFO_ERROR: {
            return {
                ...state,
                loadings: { ...state.loadings, reservation: false },
                errors: { ...state.errors, reservation: action.payload },
            }
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
