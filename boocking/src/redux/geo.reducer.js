import * as ActionTypes from '../constants/geo.constants'

const initialState = {
    cities: null,
    loadings: {
        cities: false,
    },
    errors: {
        cities: null,
    },
}
const geoReducer = (state = initialState, action) =>{
    switch (action.type){
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
        default:
            return state
    }
}
export default geoReducer
