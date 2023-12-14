import * as ActionTypes from '../constants/hotelId.constants'

const initialState = {
    hotelId: null,
    loadings: {
        hotelId: false,
    },
    errors: {
        hotelId: null,
    },
}
const hotelIdReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ActionTypes.HOTEL_ID_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, hotelId: true },
                errors: { ...state.errors, hotelId: null },
            }
        }
        case ActionTypes.HOTEL_ID_SUCCESS: {
            const hotelId = action.payload
            return {
                ...state,
                loadings: { ...state.loadings, hotelId: false },
                errors: { ...state.errors, hotelId: null },
                hotelId,
            }
        }
        case ActionTypes.HOTEL_ID_ERROR: {
            return {
                ...state,
                loadings: { ...state.loadings, hotelId: false },
                errors: { ...state.errors, hotelId: action.payload },
            }
        }
        default:
            return state
    }
}
export default hotelIdReducer