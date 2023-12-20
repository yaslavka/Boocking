import * as ActionTypes from '../constants/state.constants';

export const navBarVisible =(values)=>({
  type: ActionTypes.NAV_BAR_VISIBLE,
  payload: values,
});
export const searchBronVisible =(values)=>({
  type: ActionTypes.SEARCH_BRON_VISIBLE,
  payload: values,
});

export const modalAuthVisible =(values)=>({
  type: ActionTypes.MODAL_AUTH_VISIBLE,
  payload: values,
});
