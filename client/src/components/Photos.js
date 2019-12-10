import React from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import PropTypes from "prop-types";
import SearchBox from "./SearchBox";
import InfinitePhotos from "./InfinitePhotos";
import RecentSearches from "./RecentSearches";
import Spinner from "./Spinner";

const Photos = ({ loading }) => {
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
      {loading ? <Spinner /> : null}
      <div style={{ marginTop: "2rem", minHeight: "700px" }}>
        <InfinitePhotos />
      </div>
    </Container>
  );
};
Photos.propTypes = {
  loading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  loading: state.data.loading
});
export default connect(mapStateToProps)(Photos);
