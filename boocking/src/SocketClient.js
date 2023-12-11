import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function SocketClient() {
    //const dispatch = useDispatch()
    const mySocket = useSelector(state => state.mySocket)?.socket
    useEffect(()=>{
        mySocket?.emit('dd');
    },[mySocket])
    return (
        <></>
    )
}
export default SocketClient