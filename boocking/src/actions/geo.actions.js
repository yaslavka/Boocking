import * as ActionTypes from '../constants/geo.constants'

export const geoInfo =(values)=>({
    type: ActionTypes.GEO_REQUEST,
    payload: values,
})
export const geoInfoSuccess =(values)=>({
    type: ActionTypes.GEO_SUCCESS,
    payload: values,
})
export const geoInfoError =(values)=>({
    type: ActionTypes.GEO_SUCCESS,
    payload: values,
})

export const allCitiesInfo =(values)=>({
    type: ActionTypes.ALL_CITIES_REQUEST,
    payload: values,
})
export const allCitiesSuccess =(values)=>({
    type: ActionTypes.ALL_CITIES_SUCCESS,
    payload: values,
})
export const allCitiesError =(values)=>({
    type: ActionTypes.ALL_CITIES_ERROR,
    payload: values,
})