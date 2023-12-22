import * as ActionTypes from '../constants/reservation.constants';

const initialState = {
  reservation: [],
  reservationId: null,
  reservationInfo: null,
  reservationBook: null,
  reservationManager: [],
  loadings: {
    reservation: false,
    reservationId: false,
    reservationInfo: false,
    reservationBook: false,
    reservationManager: false,
  },
  errors: {
    reservation: [],
    reservationId: null,
    reservationInfo: null,
    reservationBook: null,
    reservationManager: [],
  },
};
const reservationReducer = (state = initialState, action) =>{
  switch (action.type) {
    case ActionTypes.RESERVATION_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, reservation: true},
        errors: {...state.errors, reservation: []},
      };
    }
    case ActionTypes.RESERVATION_SUCCESS: {
      const reservation = action.payload;
      return {
        ...state,
        loadings: {...state.loadings, reservation: false},
        errors: {...state.errors, reservation: []},
        reservation,
      };
    }
    case ActionTypes.RESERVATION_ERROR: {
      return {
        ...state,
        loadings: {...state.loadings, reservation: false},
        errors: {...state.errors, reservation: action.payload},
      };
    }

    case ActionTypes.RESERVATION_ID_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, reservationId: true},
        errors: {...state.errors, reservationId: null},
      };
    }
    case ActionTypes.RESERVATION_ID_SUCCESS: {
      const reservationId = action.payload;
      return {
        ...state,
        loadings: {...state.loadings, reservationId: false},
        errors: {...state.errors, reservationId: null},
        reservationId,
      };
    }
    case ActionTypes.RESERVATION_ID_ERROR: {
      return {
        ...state,
        loadings: {...state.loadings, reservationId: false},
        errors: {...state.errors, reservationId: action.payload},
      };
    }

    case ActionTypes.RESERVATION_INFO_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, reservationInfo: true},
        errors: {...state.errors, reservationInfo: null},
      };
    }
    case ActionTypes.RESERVATION_INFO_SUCCESS: {
      const reservationInfo = action.payload;
      return {
        ...state,
        loadings: {...state.loadings, reservationInfo: false},
        errors: {...state.errors, reservation: null},
        reservationInfo,
      };
    }
    case ActionTypes.RESERVATION_INFO_ERROR: {
      return {
        ...state,
        loadings: {...state.loadings, reservationInfo: false},
        errors: {...state.errors, reservationInfo: action.payload},
      };
    }
    case ActionTypes.RESERVATION_BOOK_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, reservationBook: true},
        errors: {...state.errors, reservationBook: null},
      };
    }
    case ActionTypes.RESERVATION_BOOK_SUCCESS: {
      const reservationBook = action.payload;
      return {
        ...state,
        loadings: {...state.loadings, reservationBook: false},
        errors: {...state.errors, reservationBook: null},
        reservationBook,
      };
    }
    case ActionTypes.RESERVATION_BOOK_ERROR: {
      return {
        ...state,
        loadings: {...state.loadings, reservationBook: false},
        errors: {...state.errors, reservationBook: action.payload},
      };
    }


    case ActionTypes.RESERVATION_MANAGER_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, reservationManager: true},
        errors: {...state.errors, reservationManager: []},
      };
    }
    case ActionTypes.RESERVATION_MANAGER_SUCCESS: {
      const reservationManager = action.payload;
      return {
        ...state,
        loadings: {...state.loadings, reservationManager: false},
        errors: {...state.errors, reservationBook: []},
        reservationManager,
      };
    }
    case ActionTypes.RESERVATION_MANAGER_ERROR: {
      return {
        ...state,
        loadings: {...state.loadings, reservationManager: false},
        errors: {...state.errors, reservationManager: action.payload},
      };
    }
    case ActionTypes.RESERVATION_CANCEL_REQUEST: {
      return {...state};
    }
    default:
      return state;
  }
};
export default reservationReducer;
