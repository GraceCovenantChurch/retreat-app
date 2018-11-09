import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { GoogleLogout } from "react-google-login";

import { signOut } from "common/authenticate.js";

const CLIENT_ID = process.env.CLIENT_ID;

const INITIAL_STATE = {

};

class SignIn extends Component {
  constructor (props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onLogoutSuccess (response) {
    let { dispatch, history } = this.props;
    dispatch(signOut());
    history.push("/");
  }

  render () {
    return (
      <GoogleLogout
        buttonText="Logout"
        clientId={ CLIENT_ID }
        onLogoutSuccess={ (e) => this.onLogoutSuccess(e) }
      />
    );
  }
}

function mapStateToProps (state) {
  return state;
}

SignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({})
};

export default connect(mapStateToProps)(SignIn);
