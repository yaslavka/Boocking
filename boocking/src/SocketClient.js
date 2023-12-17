import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as messageActions from './actions/message.actions'

function SocketClient() {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.app.user);
    const authId = userInfo && userInfo
    useEffect(()=>{
        if (authId.isAdmin){
            dispatch(messageActions.messageAdminInfo(authId.id))
        }else {
            dispatch(messageActions.messageInfo(authId.id))
        }
    },[dispatch, authId.id, authId.isAdmin])

    return (
        <></>
    )
}
export default SocketClient