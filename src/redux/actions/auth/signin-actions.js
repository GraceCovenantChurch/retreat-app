/* eslint-disable */

import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE, AUTHENTICATE_SUCCESS } from "../types";

export function signInError (message) {
  return {
    type: SIGNIN_FAILURE,
    authenticator: {
      isAuthenticated: false
    }
  };
}

export function signInUser () {
  return {
    type: SIGNIN_SUCCESS,
    isAuthenticated: true
  }
}

export function authenticateUser (user) {
  return {
    type: AUTHENTICATE_SUCCESS,
    isAuthenticated: true,
    user: user
  };
}
