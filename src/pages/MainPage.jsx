import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import NavBar from "components/navigation/NavBar";

import { authenticate } from "common/authenticate.js";

import "./MainPage.scss";

class MainPage extends Component {
  constructor (props) {
    super(props);

    let tokenId = localStorage.getItem("tokenId");

    if (tokenId) {
      props.dispatch(authenticate(tokenId));
    }
  }

  render () {
    let { history } = this.props;

    return (
      <div className="app-container">
        <NavBar history={ history }
          { ...this.props }
        />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return state;
}

MainPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({})
};

export default connect(mapStateToProps)(MainPage);
