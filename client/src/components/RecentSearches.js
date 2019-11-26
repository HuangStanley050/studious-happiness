import React from "react";
import { Label } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchStart } from "../store/actions/fetchActions";

const RecentSearches = ({ keywords, fetchPhotos }) => {
  return (
    <div
      style={{
        marginTop: "1.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {keywords.map(key => (
        <Label
          style={{ cursor: "pointer" }}
          onClick={() => fetchPhotos(key)}
          color="blue"
          key={key}
        >
          {key}
        </Label>
      ))}
    </div>
  );
};
RecentSearches.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchPhotos: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  keywords: state.auth.keywords
});
const mapDispatchToProps = dispatch => ({
  fetchPhotos: key => dispatch(fetchStart(key))
});
export default connect(mapStateToProps, mapDispatchToProps)(RecentSearches);
