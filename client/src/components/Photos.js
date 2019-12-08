import React from "react";

import { Container } from "semantic-ui-react";

import SearchBox from "./SearchBox";
import InfinitePhotos from "./InfinitePhotos";
import RecentSearches from "./RecentSearches";

const Photos = () => {
  return (
    <Container>
      <div
        style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}
      >
        <SearchBox />
      </div>
      <div>
        <RecentSearches />
      </div>
      <div style={{ marginTop: "2rem", minHeight: "700px" }}>
        <InfinitePhotos />
      </div>
    </Container>
  );
};

export default Photos;
