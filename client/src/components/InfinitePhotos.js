import React, { useState } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid, Button, Icon } from "semantic-ui-react";
import { fetchUpdate } from "../store/actions/fetchActions";
import { savePhotos } from "../store/actions/dataActions";
import CardPhoto from "./CardPhoto";

const InfinitePhotos = ({ photoData, keywords, scrollMorePhotos, save }) => {
  const [photos, setPhotos] = useState([]);

  const fetchMoreData = () => {
    scrollMorePhotos(keywords[keywords.length - 1]);
  };
  const savePhotoHandler = (imageUrl, id) => {
    const photo = photos.findIndex(element => element.id === id);
    if (photo === -1) {
      setPhotos([...photos, { imageUrl, id }]);
    } else {
      let newPhotos = [];
      newPhotos = [...photos];
      newPhotos = newPhotos.filter(currentPhoto => currentPhoto.id !== id);

      setPhotos([...newPhotos]);
    }
  };
  const submitPhotosHandler = () => {
    if (photos.length === 0) {
      alert("No photos selected");
      return;
    }
    save(photos);
    setPhotos([]);
  };

  return (
    <div style={{ marginTop: "3rem" }}>
      {photos.length !== 0 ? (
        <Grid>
          <Grid.Column textAlign="center">
            <Button onClick={submitPhotosHandler} animated="vertical">
              <Button.Content hidden>Save</Button.Content>
              <Button.Content visible>
                <Icon size="large" name="save outline" />
              </Button.Content>
            </Button>
          </Grid.Column>
        </Grid>
      ) : null}
      <InfiniteScroll
        dataLength={photoData.length}
        next={fetchMoreData}
        hasMore
        className="ui stackable two column grid"
      >
        {photoData.map((photo, index) => {
          let show = false;
          // show if the photos in in the saved array

          if (photos.some(element => element.id === photo.photoId)) {
            show = true;
          }

          return (
            <Grid.Column key={photo.photoId + index}>
              <CardPhoto
                showCheck={show}
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
  scrollMorePhotos: PropTypes.func.isRequired,

  save: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  photoData: state.data.data,
  keywords: state.data.keywords
});
const mapDispatchToProps = dispatch => {
  return {
    scrollMorePhotos: keyword => dispatch(fetchUpdate(keyword)),
    save: photos => dispatch(savePhotos(photos))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfinitePhotos);
