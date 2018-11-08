import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import NavBar from "components/navigation/NavBar";

import "./MainPage.scss";

class MainPage extends Component {
  render () {
    let { history } = this.props;

    return (
      <div className="app-container">
        <NavBar history={ history } />
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
