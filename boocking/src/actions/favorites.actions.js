import * as ActionTypes from '../constants/favorites.constants'


export const favorites = (values) => ({
    type: ActionTypes.FAVORITES_REQUEST,
    payload: values,
})
export const favoritesSuccess = (values) => ({
    type: ActionTypes.FAVORITES_SUCCESS,
    payload: values,

})
export const favoritesError = (error) => ({
    type: ActionTypes.FAVORITES_ERROR,
    payload: error,
})

export const addFavorites = (values) => ({
    type: ActionTypes.ADD_FAVORITES_REQUEST,
    payload: values,
})
export const addFavoritesSuccess = (values) => ({
    type: ActionTypes.ADD_FAVORITES_SUCCESS,
    payload: values,

})
export const addFavoritesError = (error) => ({
    type: ActionTypes.ADD_FAVORITES_ERROR,
    payload: error,
})