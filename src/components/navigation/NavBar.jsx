import React, { Component } from "react";
import PropTypes from "prop-types";

import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";

import SignIn from "components/authentication/SignIn";

import "./NavBar.scss";

const INITIAL_STATE = {
  open: false
};

class NavBar extends Component {
  constructor (props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  toggle () {
    this.setState({
      open: !this.state.open
    });
  }

  render () {
    let { history } = this.props;

    return (
      <Navbar color="dark"
        dark
        expand="md"
      >
        <NavbarBrand href="/">Grace Covenant Church: College Retreat 2019</NavbarBrand>
        <Nav className="ml-auto"
          navbar
        >
          <NavItem>
            <SignIn history={ history }/>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  history: PropTypes.shape({})
};

export default NavBar;
