import * as ActionTypes from '../constants/state.constants'

const initialState = {
  navbarVisible: false
}
const stateReducer = (state = initialState, action) =>{
    switch (action.type){
        case ActionTypes.NAV_BAR_VISIBLE: {
            const navbarVisible = action.payload
            return {...state, navbarVisible: navbarVisible}
        }
        default:
            return state
    }
}
export default stateReducer
