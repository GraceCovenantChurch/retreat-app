import axios from "axios";

import { signInUser, authenticateUser } from "redux/actions/auth/signin-actions.js";
import { signOutUser } from "redux/actions/auth/signout-actions.js";

export function signOut () {
  localStorage.removeItem("tokenId");
  localStorage.removeItem("accessToken");

  return dispatch => {
    return dispatch(signOutUser());
  };
}

export function signIn (payload) {
  localStorage.setItem("tokenId", payload.tokenId);
  localStorage.setItem("accessToken", payload.accessToken);

  return dispatch => {
    dispatch(signInUser());
    dispatch(authenticate(payload.tokenId));
  };
}

export function authenticate (data) {
  return dispatch => {
    return axios.get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + data)
      .then(response => {
        if (response.status === 200) {
          dispatch(authenticateUser(response.data));
        } else {
          dispatch(signOut());
        }
      }).catch(error => {
        console.error(error);
      });
  };
}
