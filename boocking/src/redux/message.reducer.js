import * as ActionTypes from '../constants/message.constants'

const initialState = {
    messages: [],
    user:{},
    sendMessage:null,
    loadings: {
        messages: false,
        sendMessage:false,
    },
    errors: {
        messages: [],
        sendMessage:null,
    },
}
const messagesReducer = (state = initialState, action) =>{
    switch (action.type){
        case ActionTypes.USER_REQUEST: {
            return {...state, user:action.payload}
        }
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

        case ActionTypes.SEND_MESSAGE_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, sendMessage: true },
                errors: { ...state.errors, sendMessage: [] },
            }
        }
        case ActionTypes.SEND_MESSAGE_SUCCESS: {
            const sendMessage = action.payload
            return {
                ...state,
                loadings: { ...state.loadings, sendMessage: false },
                errors: { ...state.errors, sendMessage: [] },
                sendMessage,
            }
        }
        case ActionTypes.SEND_MESSAGE_ERROR: {
            return {
                ...state,
                loadings: { ...state.loadings, sendMessage: false },
                errors: { ...state.errors, sendMessage: action.payload },
            }
        }
        default:
            return state
    }
}
export default messagesReducer
