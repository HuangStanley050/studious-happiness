import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid, Image } from "semantic-ui-react";
import { fetchStart } from "../store/actions/fetchActions";
import CardPhoto from "./CardPhoto";

const InfinitePhotos = ({ fetchPhotos, photoData }) => {
  const [cards, setCards] = useState([
    { name: "yo" },
    { name: "tim" },
    { name: "stuff" },
    { name: "again" }
  ]);
  const [length, setLengh] = useState(4);
  const fetchMoreData = () => {
    setTimeout(() => {
      setCards(cards.concat({ name: "hi" }));
    }, 1500);
  };
  return (
    <InfiniteScroll
      dataLength={cards.length}
      next={fetchMoreData}
      hasMore
      className="ui stackable two column grid"
      loader={<h4>Loading...</h4>}
    >
      {cards.map((card, index) => {
        return (
          <Grid.Column>
            <CardPhoto key={card.name} />
          </Grid.Column>
        );
      })}
    </InfiniteScroll>
  );
};
InfinitePhotos.propTypes = {
  fetchPhotos: PropTypes.func.isRequired,
  photoData: PropTypes.arrayOf(PropTypes.object).isRequired
};
const mapStateToProps = state => ({
  photoData: state.data.data
});
const mapDispatchToProps = dispatch => ({
  // fetchPhotos: () => dispatch(fetchStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(InfinitePhotos);

// <Grid.Column>
//   <CardPhoto />
// </Grid.Column>
// <Grid.Column>
//   <CardPhoto />
// </Grid.Column>
// <Grid.Column>
//   <CardPhoto />
// </Grid.Column>
// <Grid.Column>
//   <CardPhoto />
// </Grid.Column>
