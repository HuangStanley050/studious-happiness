import React from "react";
import { Container } from "semantic-ui-react";
import SearchBox from "./SearchBox";
import InfinitePhotos from "./InfinitePhotos";

const Photos = props => {
  return (
    <Container>
      <div
        style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}
      >
        <SearchBox />
      </div>
      <div style={{ marginTop: "2rem" }}>
        <InfinitePhotos />
      </div>
    </Container>
  );
};

export default Photos;
