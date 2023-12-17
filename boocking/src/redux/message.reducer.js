import * as ActionTypes from '../constants/message.constants'

const initialState = {
    messages: [],
    loadings: {
        messages: false,
    },
    errors: {
        messages: [],
    },
}
const messagesReducer = (state = initialState, action) =>{
    switch (action.type){
        case ActionTypes.MESSAGE_ADMIN_INFO_REQUEST: {
            const messages = action.payload
            return {
                ...state,
                loadings: { ...state.loadings, messages: false },
                errors: { ...state.errors, messages: [] },
                messages,
            }
        }

        case ActionTypes.MESSAGE_INFO_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, messages: true },
                errors: { ...state.errors, messages: [] },
            }
        }
        case ActionTypes.MESSAGE_INFO_SUCCESS: {
            const messages = action.payload
            return {
                ...state,
                loadings: { ...state.loadings, messages: false },
                errors: { ...state.errors, messages: [] },
                messages,
            }
        }
        case ActionTypes.MESSAGE_INFO_ERROR: {
            return {
                ...state,
                loadings: { ...state.loadings, messages: false },
                errors: { ...state.errors, messages: action.payload },
            }
        }
        default:
            return state
    }
}
export default messagesReducer
