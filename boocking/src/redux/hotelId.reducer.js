import * as ActionTypes from '../constants/hotelId.constants';

const initialState = {
  hotelId: null,
  uploadImages: null,
  loadings: {
    hotelId: false,
    uploadImages: false,
  },
  errors: {
    hotelId: null,
    uploadImages: null,
  },
};
const hotelIdReducer = (state = initialState, action) =>{
  switch (action.type) {
    case ActionTypes.HOTEL_ID_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, hotelId: true},
        errors: {...state.errors, hotelId: null},
      };
    }
    case ActionTypes.HOTEL_ID_SUCCESS: {
      const hotelId = action.payload;
      return {
        ...state,
        loadings: {...state.loadings, hotelId: false},
        errors: {...state.errors, hotelId: null},
        hotelId,
      };
    }
    case ActionTypes.HOTEL_ID_ERROR: {
      return {
        ...state,
        loadings: {...state.loadings, hotelId: false},
        errors: {...state.errors, hotelId: action.payload},
      };
    }

    case ActionTypes.UPLOAD_IMAGES_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, uploadImages: true},
        errors: {...state.errors, uploadImages: null},
      };
    }
    case ActionTypes.UPLOAD_IMAGES_SUCCESS: {
      const uploadImages = action.payload;
      return {
        ...state,
        loadings: {...state.loadings, uploadImages: false},
        errors: {...state.errors, uploadImages: null},
        uploadImages,
      };
    }
    case ActionTypes.UPLOAD_IMAGES_ERROR: {
      return {
        ...state,
        loadings: {...state.loadings, uploadImages: false},
        errors: {...state.errors, uploadImages: action.payload},
      };
    }
    case ActionTypes.HOTEL_ADD_REQUEST: {
      return {...state};
    }
    case ActionTypes.HOTEL_ID_EDIT_REQUEST: {
      return {...state};
    }

    case ActionTypes.UPLOAD_ALBUM_REQUEST: {
      return {...state};
    }
    default:
      return state;
  }
};
export default hotelIdReducer;
