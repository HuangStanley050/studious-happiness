import React from "react";
import { Label } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const RecentSearches = ({ keywords }) => {
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
        <Label color="blue" key={key}>
          {key}
        </Label>
      ))}
    </div>
  );
};
RecentSearches.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired
};
const mapStateToProps = state => ({
  keywords: state.auth.keywords
});
export default connect(mapStateToProps)(RecentSearches);
