import React from "react";
import LandingPhoto from "../assets/landingPage.jpeg";

const Landing = props => {
  const landingStyle = {
    backgroundImage: `url(${LandingPhoto})`,
    minHeight: "100vh",
    backgroundPosition: "center" /* Center the image */,
    backgroundRepeat: "no-repeat" /* Do not repeat the image */,
    backgroundSize: "cover"
  };
  const headingStyle = {
    textAlign: "center",
    transform: "translateY(4.5rem)",
    color: "green",
    fontSize: "4rem"
  };
  return (
    <div style={landingStyle}>
      <h1 style={headingStyle}>Photo Paradise</h1>
    </div>
  );
};

export default Landing;
