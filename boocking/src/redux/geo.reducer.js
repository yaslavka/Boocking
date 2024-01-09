import * as ActionTypes from '../constants/geo.constants'

const initialState = {
  cities: null,
  allCities: null,
  citiesId: null,
  loadings: {
    cities: false,
    allCities: false,
    citiesId: false,
  },
  errors: {
    cities: null,
    allCities: null,
    citiesId: null,
  },
}
const geoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GEO_REQUEST: {
      return {
        ...state,
        loadings: { ...state.loadings, cities: true },
        errors: { ...state.errors, cities: null },
      }
    }
    case ActionTypes.GEO_SUCCESS: {
      const cities = action.payload
      return {
        ...state,
        loadings: { ...state.loadings, cities: false },
        errors: { ...state.errors, cities: null },
        cities,
      }
    }
    case ActionTypes.GEO_ERROR: {
      return {
        ...state,
        loadings: { ...state.loadings, cities: false },
        errors: { ...state.errors, cities: action.payload },
      }
    }
    case ActionTypes.ALL_CITIES_REQUEST: {
      return {
        ...state,
        loadings: { ...state.loadings, allCities: true },
        errors: { ...state.errors, allCities: null },
      }
    }
    case ActionTypes.ALL_CITIES_SUCCESS: {
      const allCities = action.payload
      return {
        ...state,
        loadings: { ...state.loadings, allCities: false },
        errors: { ...state.errors, allCities: null },
        allCities,
      }
    }
    case ActionTypes.ALL_CITIES_ERROR: {
      return {
        ...state,
        loadings: { ...state.loadings, allCities: false },
        errors: { ...state.errors, allCities: action.payload },
      }
    }

    case ActionTypes.CITIES_ID_REQUEST: {
      return {
        ...state,
        loadings: { ...state.loadings, citiesId: true },
        errors: { ...state.errors, citiesId: null },
      }
    }
    case ActionTypes.CITIES_ID_SUCCESS: {
      const citiesId = action.payload
      return {
        ...state,
        loadings: { ...state.loadings, citiesId: false },
        errors: { ...state.errors, citiesId: null },
        citiesId,
      }
    }
    case ActionTypes.CITIES_ID_ERROR: {
      return {
        ...state,
        loadings: { ...state.loadings, citiesId: false },
        errors: { ...state.errors, citiesId: action.payload },
      }
    }
    default:
      return state
  }
}
export default geoReducer
