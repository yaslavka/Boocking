import { takeEvery, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import * as ActionTypes from '../constants/message.constants'
import * as actions from '../actions/message.actions'
import {socket} from "../api";

const allMessage =(action)=>{
    return new Promise((resolve , reject)=>{
        socket.emit('allMessage', action)
        socket.on('allMessageRec', data =>{
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data);
            }
        })
    })
}

const allMessageAdmin =(action)=>{
    return new Promise((resolve , reject)=>{
        socket.emit('allMessageHelp', action)
        socket.on('allMessageHelpRec', data =>{
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data);
            }
        })
    })
}

const sendMessage=(action)=>{
    return new Promise((resolve , reject)=>{
        socket.emit('sendMessage', action)
        socket.on('allMessageRec', data =>{
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data);
            }
        })
    })
}

export function* messageInfo(action) {
    try {
        const response = yield call(allMessage, action.payload)
        if (response) {
            yield put(actions.messageInfoSuccess(response))
        }
    } catch (error) {
        yield put(actions.messageInfoError(error.message))
        toast.error(error.message)
    }
}

export function* messageAdminInfo(action) {
    try {
        const response = yield call(allMessageAdmin, action.payload)
        if (response) {
            yield put(actions.messageInfoSuccess(response))
        }
    } catch (error) {
        yield put(actions.messageInfoError(error.message))
        toast.error(error.message)
    }
}

export function* sendMessages(action) {
    try {
        const response = yield call(sendMessage, action.payload)
        if (response) {
            yield put(actions.messageInfoSuccess(response))
        }
    } catch (error) {
        yield put(actions.messageInfoError(error.message))
        toast.error(error.message)
    }
}

export default function* messageSaga() {
    yield all([
        takeEvery(ActionTypes.MESSAGE_INFO_REQUEST, messageInfo),
        takeEvery(ActionTypes.MESSAGE_ADMIN_INFO_REQUEST, messageAdminInfo),
        takeEvery(ActionTypes.SEND_MESSAGE_REQUEST, sendMessages),
    ])
}
