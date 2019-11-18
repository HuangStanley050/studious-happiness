import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NavBar = props => {
  return (
    <Menu size="large" stackable position="right">
      <Menu.Item>
        <img src="https://react.semantic-ui.com/logo.png" />
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          as={Link}
          to="/login"

          // active={activeItem === "features"}
          // onClick={this.handleItemClick}
        >
          Login
        </Menu.Item>

        <Menu.Item
          name="dashboard"
          as={Link}
          to="/dashboard"
          // active={activeItem === "testimonials"}
          // onClick={this.handleItemClick}
        >
          Dashboard
        </Menu.Item>

        <Menu.Item
          name="photos"
          as={Link}
          to="/photos"
          // active={activeItem === "sign-in"}
          // onClick={this.handleItemClick}
        >
          Photos
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;
