import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { GoogleLogin } from "react-google-login";

import { signIn } from "common/authenticate.js";

const CLIENT_ID = process.env.CLIENT_ID;

const INITIAL_STATE = {

};

class SignIn extends Component {
  constructor (props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onSuccess (response) {
    let { dispatch, history } = this.props;
    dispatch(signIn(response));
    history.push("/");
  }

  onFailure (response) {

  }

  render () {
    return (
      <GoogleLogin
        buttonText="Login"
        clientId={ CLIENT_ID }
        onFailure={ (e) => this.onFailure(e) }
        onSuccess={ (e) => this.onSuccess(e) }
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
