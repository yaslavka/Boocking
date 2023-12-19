import * as ActionTypes from '../constants/message.constants'

const initialState = {
    messages: [],
    messagesAdmin: [],
    user:{},
    sendMessage:null,
    sendMessageAdmin:null,
    loadings: {
        messages: false,
        sendMessage:false,
        messagesAdmin: false,
        sendMessageAdmin:false,
    },
    errors: {
        messages: [],
        sendMessage:null,
        messagesAdmin: [],
        sendMessageAdmin:null,
    },
}
const messagesReducer = (state = initialState, action) =>{
    switch (action.type){
        case ActionTypes.USER_REQUEST: {
            return {...state, user:action.payload}
        }
        case ActionTypes.MESSAGE_ADMIN_INFO_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, messagesAdmin: true },
                errors: { ...state.errors, messagesAdmin: [] },
            }
        }
        case ActionTypes.MESSAGE_ADMIN_INFO_SUCCESS: {
            const messagesAdmin = action.payload
            return {
                ...state,
                loadings: { ...state.loadings, messagesAdmin: false },
                errors: { ...state.errors, messagesAdmin: [] },
                messagesAdmin,
            }
        }
        case ActionTypes.MESSAGE_ADMIN_INFO_ERROR: {
            return {
                ...state,
                loadings: { ...state.loadings, messagesAdmin: false },
                errors: { ...state.errors, messagesAdmin: [] },
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

        case ActionTypes.SEND_MESSAGE_ADMIN_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, sendMessageAdmin: true },
                errors: { ...state.errors, sendMessageAdmin: [] },
            }
        }
        case ActionTypes.SEND_MESSAGE_ADMIN_SUCCESS: {
            const sendMessageAdmin = action.payload
            return {
                ...state,
                loadings: { ...state.loadings, sendMessageAdmin: false },
                errors: { ...state.errors, sendMessageAdmin: [] },
                sendMessageAdmin,
            }
        }
        case ActionTypes.SEND_MESSAGE_ADMIN_ERROR: {
            return {
                ...state,
                loadings: { ...state.loadings, sendMessageAdmin: false },
                errors: { ...state.errors, sendMessageAdmin: action.payload },
            }
        }
        default:
            return state
    }
}
export default messagesReducer
