import * as socketActions from '../constants/socket.constants'

const socketReducer = (state = [], action) => {
  switch (action.type) {
    case socketActions.SOCKET_REQUEST: {
      const socket = action.payload
      return { ...state, socket }
    }
    default:
      return state
  }
}
export default socketReducer
