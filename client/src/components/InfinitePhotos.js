import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid, Image } from "semantic-ui-react";
import { fetchStart, fetchUpdate } from "../store/actions/fetchActions";
import CardPhoto from "./CardPhoto";

const InfinitePhotos = ({ photoData, keywords, scrollMorePhotos }) => {
  const [cards, setCards] = useState([
    { name: "yo" },
    { name: "tim" },
    { name: "stuff" },
    { name: "again" }
  ]);
  const [length, setLengh] = useState(4);
  const fetchMoreData = () => {
    // if (keywords.length === 0) return;
    scrollMorePhotos(keywords[keywords.length - 1]);
  };
  return (
    <div style={{ marginTop: "3rem" }}>
      <InfiniteScroll
        dataLength={photoData.length}
        next={fetchMoreData}
        hasMore
        className="ui stackable two column grid"
        loader={<h4>Loading...</h4>}
      >
        {photoData.map(photo => {
          return (
            <Grid.Column>
              <CardPhoto imageUrl={photo.photoUrl} key={photo.photoId} />
            </Grid.Column>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
InfinitePhotos.propTypes = {
  photoData: PropTypes.arrayOf(PropTypes.object).isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  scrollMorePhotos: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  photoData: state.data.data,
  keywords: state.data.keywords
});
const mapDispatchToProps = dispatch => {
  return {
    scrollMorePhotos: keyword => dispatch(fetchUpdate(keyword))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfinitePhotos);
