import React from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import SearchBox from "./SearchBox";
import InfinitePhotos from "./InfinitePhotos";
import Spinner from "./Spinner";

const Photos = ({ loading }) => {
  return (
    <Container>
      {loading && <Spinner />}
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
Photos.propTypes = {
  loading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  loading: state.data.loading
});
export default connect(mapStateToProps)(Photos);
