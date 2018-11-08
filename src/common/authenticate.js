import axios from "axios";

import { signInUser, authenticateUser } from "redux/actions/auth/signin-actions.js";

export function signIn (payload) {
  localStorage.setItem("tokenId", payload.tokenId);
  localStorage.setItem("accessToken", payload.accessToken);

  return dispatch => {
    return dispatch(signInUser());
  };
}

export function authenticate (data) {
  return dispatch => {
    return axios.get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + data.tokenId)
      .then(response => {
        dispatch(authenticateUser(response.data));
      }).catch(error => {
        console.error(error);
      });
  };
}
