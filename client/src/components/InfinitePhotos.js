import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid } from "semantic-ui-react";
import { fetchUpdate } from "../store/actions/fetchActions";
import CardPhoto from "./CardPhoto";

const InfinitePhotos = ({ photoData, keywords, scrollMorePhotos }) => {
  const [photos, setPhotos] = useState([]);
  const fetchMoreData = () => {
    // if (keywords.length === 0) return;
    scrollMorePhotos(keywords[keywords.length - 1]);
  };
  const savePhotoHandler = (imageUrl, id) => {
    setPhotos([...photos, { imageUrl, id }]);
    console.log(photos);
  };
  return (
    <div style={{ marginTop: "3rem" }}>
      <InfiniteScroll
        dataLength={photoData.length}
        next={fetchMoreData}
        hasMore
        className="ui stackable two column grid"
      >
        {photoData.map(photo => {
          return (
            <Grid.Column key={photo.photoId}>
              <CardPhoto
                savePhoto={savePhotoHandler}
                id={photo.photoId}
                imageUrl={photo.photoUrl}
              />
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
