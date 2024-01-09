import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as messageActions from './actions/message.actions'
import { socket } from './api'

function SocketClient() {
  const dispatch = useDispatch()
  useEffect(() => {
    socket.on('allMessageRec', (data) => {
      dispatch(messageActions.messageInfoSuccess(data))
    })
    socket.on('allMessageHelpRec', (data) => {
      dispatch(messageActions.messageAdminInfoSuccess(data))
    })
  }, [dispatch, socket])
  return <></>
}
export default SocketClient
