import * as ActionTypes from '../constants/app.constants'
import * as AuthActionTypes from '../constants/auth.constants'

const initialState = {
    pages: 1,
    user: null,
    uploadAvatar:null,
    loadings: {
        user: false,
        uploadAvatar:false,
    },
    errors: {
        user: null,
        uploadAvatar:null,
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

        case ActionTypes.UPLOAD_AVATAR_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, uploadAvatar: true },
                errors: { ...state.errors, uploadAvatar: null },
            }
        }
        case ActionTypes.UPLOAD_AVATAR_SUCCESS: {
            const uploadAvatar = action.payload
            return {
                ...state,
                loadings: { ...state.loadings, uploadAvatar: false },
                errors: { ...state.errors, uploadAvatar: null },
                uploadAvatar,
            }
        }
        case ActionTypes.UPLOAD_AVATAR_ERROR: {
            return {
                ...state,
                loadings: { ...state.loadings, uploadAvatar: false },
                errors: { ...state.errors, uploadAvatar: action.payload },
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
