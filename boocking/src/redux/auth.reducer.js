import * as ActionTypes from '../constants/auth.constants';

const initialState = {
  isAuthenticated: false,
  signIn: null,
  signUp: null,
  inviter: null,
  loadings: {
    signIn: false,
    signUp: false,
    inviter: false,
    loader: false,
  },
  errors: {
    signIn: null,
    signUp: null,
    inviter: null,
  },
};

const authReducer = (state = initialState, action)=>{
  switch (action.type) {
    case ActionTypes.LOADING_REQUEST: {
      const loader = action.payload;
      return {
        ...state,
        loadings: {...state.loadings, loader: loader},
      };
    }
    case ActionTypes.SIGN_IN_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, signIn: true},
        errors: {...state.errors, signIn: null},
      };
    }
    case ActionTypes.SIGN_IN_SUCCESS: {
      const signIn = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        loadings: {...state.loadings, signIn: false},
        errors: {...state.errors, signIn: null},
        signIn,
      };
    }
    case ActionTypes.SIGN_IN_ERROR: {
      return {
        ...state,
        isAuthenticated: false,
        loadings: {...state.loadings, signIn: false},
        errors: {...state.errors, signIn: action.payload},
      };
    }
    case ActionTypes.INVITER_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, inviter: true},
        errors: {...state.errors, inviter: null},
      };
    }
    case ActionTypes.INVITER_SUCCESS: {
      return {
        ...state,
        inviter: action.payload,
        loadings: {...state.loadings, inviter: false},
        errors: {...state.errors, inviter: null},
      };
    }
    case ActionTypes.INVITER_ERROR: {
      return {
        ...state,
        inviter: null,
        loadings: {...state.loadings, inviter: false},
        errors: {...state.errors, inviter: action.payload},
      };
    }
    case ActionTypes.CLEAR_INVITER: {
      return {...state, inviter: null};
    }

    case ActionTypes.SIGN_UP_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, signUp: true},
        errors: {...state.errors, signUp: null},
      };
    }
    case ActionTypes.SIGN_UP_SUCCESS: {
      const signUp = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        loadings: {...state.loadings, signUp: false},
        errors: {...state.errors, signUp: null},
        signUp,
      };
    }
    case ActionTypes.SIGN_UP_ERROR: {
      return {
        ...state,
        isAuthenticated: false,
        loadings: {...state.loadings, signUp: false},
        errors: {...state.errors, signUp: action.payload},
      };
    }
    case ActionTypes.SIGN_OUT_REQUEST:
    case ActionTypes.SIGN_OUT_SUCCESS:
    case ActionTypes.SIGN_OUT_ERROR: {
      return initialState;
    }

    default:
      return state;
  }
};
export default authReducer;
