import React from "react";
import PropTypes from "prop-types";
import { Card, Icon, Image } from "semantic-ui-react";

const CardPhoto = ({ imageUrl }) => (
  <Card style={{ margin: "0 auto" }}>
    <Image src={imageUrl} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className="date">Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="user" />
        22 Friends
      </a>
    </Card.Content>
  </Card>
);
CardPhoto.propTypes = {
  imageUrl: PropTypes.string.isRequired
};
export default CardPhoto;
