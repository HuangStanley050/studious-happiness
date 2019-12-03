import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../store/actions/authActions";

const NavBar = props => {
  const { location, isAuth } = props;
  const handleLogout = () => {
    if (window.confirm("Are you logging out?")) {
      props.logout();
    }
  };
  return (
    <Menu style={{ marginBottom: "0" }} size="large" stackable position="right">
      <Menu.Item>
        <img alt="app logo" src="https://react.semantic-ui.com/logo.png" />
      </Menu.Item>
      <Menu.Menu position="right">
        {isAuth ? null : (
          <Menu.Item
            name="login"
            as={Link}
            to="/login"
            active={location.pathname === "/login"}
          >
            Login
          </Menu.Item>
        )}
        {isAuth ? (
          <Menu.Item onClick={handleLogout} name="logout">
            Logout
          </Menu.Item>
        ) : null}

        {isAuth ? (
          <Menu.Item
            name="dashboard"
            as={Link}
            to="/dashboard"
            active={location.pathname === "/dashboard"}
            // active={activeItem === "testimonials"}
          >
            Dashboard
          </Menu.Item>
        ) : null}

        {isAuth ? (
          <Menu.Item
            name="photos"
            as={Link}
            to="/photos"
            active={location.pathname === "/photos"}
            // active={activeItem === "sign-in"}
          >
            Photos
          </Menu.Item>
        ) : null}
      </Menu.Menu>
    </Menu>
  );
};
NavBar.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  isAuth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
