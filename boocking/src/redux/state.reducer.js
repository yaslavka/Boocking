import * as ActionTypes from '../constants/state.constants';

const initialState = {
  navbarVisible: false,
  bronVisible: false,
  authVisible: false,
};
const stateReducer = (state = initialState, action) =>{
  switch (action.type) {
    case ActionTypes.NAV_BAR_VISIBLE: {
      const navbarVisible = action.payload;
      return {...state, navbarVisible: navbarVisible};
    }
    case ActionTypes.SEARCH_BRON_VISIBLE: {
      const bronVisible = action.payload;
      return {...state, bronVisible: bronVisible};
    }
    case ActionTypes.MODAL_AUTH_VISIBLE: {
      const authVisible = action.payload;
      return {...state, authVisible: authVisible};
    }
    default:
      return state;
  }
};
export default stateReducer;
