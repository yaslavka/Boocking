import * as ActionTypes from '../constants/number.constants';

const initialState = {
  numberInfo: null,
  loadings: {
    numberInfo: false,
  },
  errors: {
    numberInfo: null,
  },
};
const numberInfoReducer = (state = initialState, action) =>{
  switch (action.type) {
    case ActionTypes.NUMBER_INFO_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, numberInfo: true},
        errors: {...state.errors, numberInfo: null},
      };
    }
    case ActionTypes.NUMBER_INFO_SUCCESS: {
      const numberInfo = action.payload;
      return {
        ...state,
        loadings: {...state.loadings, numberInfo: false},
        errors: {...state.errors, numberInfo: null},
        numberInfo,
      };
    }
    case ActionTypes.NUMBER_INFO_ERROR: {
      return {
        ...state,
        loadings: {...state.loadings, numberInfo: false},
        errors: {...state.errors, numberInfo: action.payload},
      };
    }
    default:
      return state;
  }
};
export default numberInfoReducer;
