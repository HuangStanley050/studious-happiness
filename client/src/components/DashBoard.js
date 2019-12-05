import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Grid, Image, Segment, Container } from "semantic-ui-react";

import { fetchCollectionStart } from "../store/actions/fetchActions";

const DashBoard = ({ getCollection, collection }) => {
  useEffect(() => {
    getCollection();
  }, []);
  const photoCollection = (
    <Grid stackable columns={2}>
      <Grid.Column>
        <Segment>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
      </Grid.Column>
    </Grid>
  );
  return (
    <div style={{ marginTop: "2rem" }}>
      <Container>
        <h1 style={{ textAlign: "center" }}>Saved Collection</h1>
        {collection.length === 0 ? (
          <h2 style={{ textAlign: "center", color: "red" }}>
            You have no photos saved
          </h2>
        ) : (
          photoCollection
        )}
      </Container>
    </div>
  );
};
DashBoard.propTypes = {
  getCollection: PropTypes.func.isRequired,
  collection: PropTypes.arrayOf(PropTypes.object).isRequired
};
const mapDispatchToProps = dispatch => ({
  getCollection: () => dispatch(fetchCollectionStart())
});
const mapStateToProps = state => ({
  collection: state.data.collection
});
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
