import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchCollectionStart } from "../store/actions/fetchActions";

const DashBoard = ({ getCollection }) => {
  useEffect(() => {
    getCollection();
  }, [getCollection]);
  return <h1>Dashboard</h1>;
};
DashBoard.propTypes = {
  getCollection: PropTypes.func.isRequired
};
const mapDispatchToProps = dispatch => ({
  getCollection: () => dispatch(fetchCollectionStart())
});
export default connect(null, mapDispatchToProps)(DashBoard);
