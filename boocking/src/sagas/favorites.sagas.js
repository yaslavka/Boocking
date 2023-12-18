import { takeEvery, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import * as ActionTypes from '../constants/favorites.constants'
import * as actions from '../actions/favorites.actions'
import * as api from '../api/favorites.api'

export function* favorites() {
    try {
        const response = yield call(api.favorites)
        if (response) {
            yield put(actions.favoritesSuccess(response))
        }
    } catch (error) {
        yield put(actions.favoritesError(error.message))
        toast.error(error.message)
    }
}

export function* addFavorites(action) {
    try {
        const response = yield call(api.addFavorites, action.payload)
        if (response) {
            yield put(actions.favoritesSuccess(response))
            const favorites = yield call(api.favorites)
            if (favorites) {
                yield put(actions.favoritesSuccess(favorites))
            }
        }
    } catch (error) {
        yield put(actions.favoritesError(error.message))
        toast.error(error.message)
    }
}

export default function* favoritesSaga() {
    yield all([
        takeEvery(ActionTypes.FAVORITES_REQUEST, favorites),
        takeEvery(ActionTypes.ADD_FAVORITES_REQUEST, addFavorites),
    ])
}