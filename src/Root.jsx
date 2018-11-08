import PropTypes from "prop-types";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import createBrowserHistory from "history/createBrowserHistory";

import MainRouter from "./pages/MainRouter";

const history = createBrowserHistory();

export default class Root extends Component {
  render () {
    let { store } = this.props;
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <MainRouter history={ history }/>
        </BrowserRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired
  }).isRequired
};
