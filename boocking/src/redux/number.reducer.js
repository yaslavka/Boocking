import * as ActionTypes from '../constants/number.constants'

const initialState = {
  numberInfo: null,
  numberManagerInfo: [],
  numberAdd: null,
  loadings: {
    numberInfo: false,
    numberManagerInfo: false,
  },
  errors: {
    numberInfo: null,
    numberManagerInfo: [],
    numberAdd: null,
  },
}
const numberInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.NUMBER_INFO_REQUEST: {
      return {
        ...state,
        loadings: { ...state.loadings, numberInfo: true },
        errors: { ...state.errors, numberInfo: null },
      }
    }
    case ActionTypes.NUMBER_INFO_SUCCESS: {
      const numberInfo = action.payload
      return {
        ...state,
        loadings: { ...state.loadings, numberInfo: false },
        errors: { ...state.errors, numberInfo: null },
        numberInfo,
      }
    }
    case ActionTypes.NUMBER_INFO_ERROR: {
      return {
        ...state,
        loadings: { ...state.loadings, numberInfo: false },
        errors: { ...state.errors, numberInfo: action.payload },
      }
    }

    case ActionTypes.NUMBER_MANAGER_REQUEST: {
      return {
        ...state,
        loadings: { ...state.loadings, numberManagerInfo: true },
        errors: { ...state.errors, numberManagerInfo: null },
      }
    }
    case ActionTypes.NUMBER_MANAGER_SUCCESS: {
      const numberManagerInfo = action.payload
      return {
        ...state,
        loadings: { ...state.loadings, numberManagerInfo: false },
        errors: { ...state.errors, numberManagerInfo: [] },
        numberManagerInfo,
      }
    }
    case ActionTypes.NUMBER_MANAGER_ERROR: {
      return {
        ...state,
        loadings: { ...state.loadings, numberManagerInfo: false },
        errors: { ...state.errors, numberManagerInfo: action.payload },
      }
    }
    case ActionTypes.UPLOAD_IMAGES_NUMBER_REQUEST: {
      return { ...state }
    }
    case ActionTypes.UPLOAD_ALBUM_IMAGES_NUMBER_REQUEST: {
      return { ...state }
    }
    case ActionTypes.NUMBER_EDIT_REQUEST: {
      return { ...state }
    }
    case ActionTypes.NUMBER_ADD_REQUEST: {
      return { ...state }
    }
    case ActionTypes.NUMBER_ADD_SUCCESS: {
      const numberAdd = action.payload
      return { ...state, numberAdd: numberAdd }
    }
    case ActionTypes.NUMBER_ADD_ERROR: {
      return { ...state, numberAdd: null }
    }
    default:
      return state
  }
}
export default numberInfoReducer
