import * as ActionTypes from '../constants/favorites.constants';

const initialState = {
  favorites: [],
  addFavorites: null,
  loadings: {
    favorites: false,
    addFavorites: false,
  },
  errors: {
    favorites: null,
    addFavorites: null,
  },
};
const favoritesReducer = (state = initialState, action) =>{
  switch (action.type) {
    case ActionTypes.FAVORITES_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, favorites: true},
        errors: {...state.errors, favorites: null},
      };
    }
    case ActionTypes.FAVORITES_SUCCESS: {
      const favorites = action.payload;
      return {
        ...state,
        loadings: {...state.loadings, favorites: false},
        errors: {...state.errors, favorites: null},
        favorites,
      };
    }
    case ActionTypes.FAVORITES_ERROR: {
      return {
        ...state,
        loadings: {...state.loadings, favorites: false},
        errors: {...state.errors, favorites: action.payload},
      };
    }

    case ActionTypes.ADD_FAVORITES_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, addFavorites: true},
        errors: {...state.errors, addFavorites: null},
      };
    }
    case ActionTypes.ADD_FAVORITES_SUCCESS: {
      const addFavorites = action.payload;
      return {
        ...state,
        loadings: {...state.loadings, addFavorites: false},
        errors: {...state.errors, addFavorites: null},
        addFavorites,
      };
    }
    case ActionTypes.ADD_FAVORITES_ERROR: {
      return {
        ...state,
        loadings: {...state.loadings, addFavorites: false},
        errors: {...state.errors, addFavorites: action.payload},
      };
    }

    default:
      return state;
  }
};
export default favoritesReducer;
