import React, { useState } from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

const NavBar = props => {
  const { location } = props;

  return (
    <Menu size="large" stackable position="right">
      <Menu.Item>
        <img alt="app logo" src="https://react.semantic-ui.com/logo.png" />
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          as={Link}
          to="/login"
          active={location.pathname === "/login"}
        >
          Login
        </Menu.Item>

        <Menu.Item
          name="dashboard"
          as={Link}
          to="/dashboard"
          active={location.pathname === "/dashboard"}
          // active={activeItem === "testimonials"}
        >
          Dashboard
        </Menu.Item>

        <Menu.Item
          name="photos"
          as={Link}
          to="/photos"
          active={location.pathname === "/photos"}
          // active={activeItem === "sign-in"}
        >
          Photos
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
NavBar.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired
};
export default withRouter(NavBar);
