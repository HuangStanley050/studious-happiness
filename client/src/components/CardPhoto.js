import React from "react";
import PropTypes from "prop-types";
import { Card, Icon, Image } from "semantic-ui-react";

const CardPhoto = ({ imageUrl, id }) => (
  <Card style={{ margin: "0 auto" }}>
    <Image src={imageUrl} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Photo id: {id}</Card.Header>
    </Card.Content>
  </Card>
);
CardPhoto.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};
export default CardPhoto;
