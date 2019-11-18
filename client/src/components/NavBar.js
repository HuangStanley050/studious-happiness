import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import TekkenLogo from "../tekkenLogo.png";

const NavBar = props => {
  const [activeLink, setActiveLink] = useState("");
  const handleLinkClick = (e, { name }) => {
    const link = name;

    setActiveLink(link);
  };
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
          active={activeLink === "login"}
          // active={activeItem === "features"}
          onClick={handleLinkClick}
        >
          Login
        </Menu.Item>

        <Menu.Item
          name="dashboard"
          as={Link}
          to="/dashboard"
          active={activeLink === "dashboard"}
          // active={activeItem === "testimonials"}
          onClick={handleLinkClick}
        >
          Dashboard
        </Menu.Item>

        <Menu.Item
          name="photos"
          as={Link}
          to="/photos"
          active={activeLink === "photos"}
          // active={activeItem === "sign-in"}
          onClick={handleLinkClick}
        >
          Photos
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;
