import React from "react";
import PropTypes from "prop-types";
import { Router, Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";

import MainPage from "./MainPage";

import "./MainRouter.scss";

function MainRouter ({ history }) {
  return (
    <div className="college-retreat-application">
      <div className="college-retreat-content">
        <Router history={ history }>
          <Switch>
            <Route component={ MainPage }
              exact
              path="/"
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

MainRouter.propTypes = {
  history: PropTypes.shape({})
};

export default withRouter(MainRouter);
