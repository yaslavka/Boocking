import * as ActionTypes from '../constants/pay.constants';

const initialState = {
  payHistory: [],
  pay: null,
  loadings: {
    payHistory: false,
  },
  errors: {
    payHistory: [],
  },
};
const payReducer = (state = initialState, action) =>{
  switch (action.type) {
    case ActionTypes.PAY_REQUEST: {
      return {...state};
    }
    case ActionTypes.PAY_SUCCESS: {
      const pay = action.payload;
      return {...state, pay: pay};
    }
    case ActionTypes.PAY_HISTORY_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, payHistory: true},
        errors: {...state.errors, payHistory: []},
      };
    }
    case ActionTypes.PAY_HISTORY_SUCCESS: {
      const payHistory = action.payload;
      return {
        ...state,
        loadings: {...state.loadings, payHistory: false},
        errors: {...state.errors, payHistory: []},
        payHistory,
      };
    }

    case ActionTypes.PAY_HISTORY_ERROR: {
      return {
        ...state,
        loadings: {...state.loadings, payHistory: false},
        errors: {...state.errors, payHistory: []},
      };
    }
    case ActionTypes.WITHDRAWAL_REQUEST: {
      return {...state};
    }
    default:
      return state;
  }
};
export default payReducer;
