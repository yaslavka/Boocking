import * as ActionTypes from '../constants/recommended.constants';

const initialState = {
  recommended: null,
  actions: null,
  loadings: {
    recommended: false,
    actions: false,
  },
  errors: {
    recommended: null,
    actions: null,
  },
};

const recommendedReducer = (state = initialState, action)=>{
  switch (action.type) {
    case ActionTypes.RECOMMENDED_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, recommended: true},
        errors: {...state.errors, recommended: null},
      };
    }
    case ActionTypes.RECOMMENDED_SUCCESS: {
      const recommended = action.payload;
      return {
        ...state,
        loadings: {...state.loadings, recommended: false},
        errors: {...state.errors, recommended: null},
        recommended,
      };
    }
    case ActionTypes.RECOMMENDED_ERROR: {
      return {
        ...state,
        loadings: {...state.loadings, recommended: false},
        errors: {...state.errors, recommended: action.payload},
      };
    }
    case ActionTypes.ACTIONS_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, actions: true},
        errors: {...state.errors, actions: null},
      };
    }
    case ActionTypes.ACTIONS_SUCCESS: {
      const actions = action.payload;
      return {
        ...state,
        loadings: {...state.loadings, actions: false},
        errors: {...state.errors, actions: null},
        actions,
      };
    }
    case ActionTypes.ACTIONS_ERROR: {
      return {
        ...state,
        loadings: {...state.loadings, actions: false},
        errors: {...state.errors, actions: action.payload},
      };
    }
    default:
      return state;
  }
};
export default recommendedReducer;
