import React from "react";
import PropTypes from "prop-types";
import { Card, Icon, Image, Button } from "semantic-ui-react";

const CardPhoto = ({ imageUrl, id, savePhoto }) => (
  <Card style={{ margin: "0 auto" }}>
    <Image src={imageUrl} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Photo id: {id}</Card.Header>
      <Button onClick={() => savePhoto(imageUrl, id)} basic color="green">
        Save Photo
      </Button>
      <Icon style={{ marginLeft: "2rem" }} name="checkmark" />
    </Card.Content>
  </Card>
);
CardPhoto.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  savePhoto: PropTypes.func.isRequired
};
export default CardPhoto;
