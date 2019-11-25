import React from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import SearchBox from "./SearchBox";
import InfinitePhotos from "./InfinitePhotos";

const Photos = () => {
  return (
    <Container>
      <div
        style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}
      >
        <SearchBox />
      </div>
      <div style={{ marginTop: "2rem", minHeight: "700px" }}>
        <InfinitePhotos />
      </div>
    </Container>
  );
};

export default Photos;
