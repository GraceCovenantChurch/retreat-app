import { INITIAL_STATE } from "../../common/app-const";
import { SIGNIN_FAILURE, SIGNIN_SUCCESS, SIGNOUT_SUCCESS, AUTHENTICATE_SUCCESS } from "../actions/types";

const authenticator = (state = INITIAL_STATE.authenticator, action) => {
  switch (action.type) {
    case SIGNIN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false
      });
    case SIGNOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false
      });
    case SIGNIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true
      });
    case AUTHENTICATE_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true
      });
    default:
      return state;
  }
};

export default authenticator;
