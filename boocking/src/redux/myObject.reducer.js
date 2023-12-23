import * as ActionTypes from '../constants/myObject.constants';

const initialState = {
  object: [],
  loadings: {
    object: false,
  },
  errors: {
    object: [],
  },
};

const myObjectReducer = (state = initialState, action)=>{
  switch (action.type) {
    case ActionTypes.MY_OBJECT_INFO_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, object: true},
        errors: {...state.errors, object: []},
      };
    }
    case ActionTypes.MY_OBJECT_INFO_SUCCESS: {
      const object = action.payload;
      return {
        ...state,
        loadings: {...state.loadings, object: false},
        errors: {...state.errors, object: []},
        object,
      };
    }
    case ActionTypes.MY_OBJECT_INFO_ERROR: {
      return {
        ...state,
        loadings: {...state.loadings, object: false},
        errors: {...state.errors, object: action.payload},
      };
    }
    default:
      return state;
  }
};
export default myObjectReducer;
