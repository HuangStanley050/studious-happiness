import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Input, Icon } from "semantic-ui-react";
import { fetchStart } from "../store/actions/fetchActions";

const SearchBox = ({ fetchPhotos }) => {
  const [keyword, setKeyWord] = useState("");
  const handleChange = e => {
    setKeyWord(e.target.value);
  };
  const handleSearchClick = e => {
    fetchPhotos(keyword);
  };
  return (
    <Input
      icon={
        <Icon
          onClick={handleSearchClick}
          name="search"
          inverted
          circular
          link
        />
      }
      onChange={handleChange}
      value={keyword}
      placeholder="Search..."
    />
  );
};
SearchBox.propTypes = {
  fetchPhotos: PropTypes.func.isRequired
};
const mapDispatchToProps = dispatch => ({
  fetchPhotos: keyword => dispatch(fetchStart(keyword))
});
export default connect(null, mapDispatchToProps)(SearchBox);
