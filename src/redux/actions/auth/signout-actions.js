import { SIGNOUT_REQUEST, SIGNOUT_SUCCESS } from "../types";

function requestSignOut () {
  return {
    type: SIGNOUT_REQUEST,
    isAuthenticated: true
  };
}

function receiveSignOut () {
  return {
    type: SIGNOUT_SUCCESS,
    isAuthenticated: false
  };
}

export function signOutUser () {
  return dispatch => {
    dispatch(requestSignOut());
    dispatch(receiveSignOut());
  };
}
