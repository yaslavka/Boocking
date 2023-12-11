import * as ActionTypes from '../constants/auth.constants'

const initialState = {
    isAuthenticated: false,
    signIn: null,
    inviter: null,
    loadings: {
        signIn: false,
        inviter: false,
        loader:false
    },
    errors: {
        signIn: null,
        inviter: null,
    },
}

const authReducer = (state = initialState, action)=>{
    switch (action.type){
        case ActionTypes.LOADING_REQUEST:{
            const loader = action.payload
            return {
                ...state,
                loadings: {...state.loadings, loader:loader}
            }
        }
        case ActionTypes.SIGN_IN_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, signIn: true },
                errors: { ...state.errors, signIn: null },
            }
        }
        case ActionTypes.SIGN_IN_SUCCESS: {
            const signIn = action.payload
            return {
                ...state,
                isAuthenticated: true,
                loadings: { ...state.loadings, signIn: false },
                errors: { ...state.errors, signIn: null },
                signIn,
            }
        }
        case ActionTypes.SIGN_IN_ERROR: {
            return {
                ...state,
                isAuthenticated: false,
                loadings: { ...state.loadings, signIn: false },
                errors: { ...state.errors, signIn: action.payload },
            }
        }
        case ActionTypes.SIGN_OUT_REQUEST:
        case ActionTypes.SIGN_OUT_SUCCESS:
        case ActionTypes.SIGN_OUT_ERROR: {
            return initialState
        }

        default:
            return state
    }
}
export default authReducer
