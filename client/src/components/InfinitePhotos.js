import React from "react";
import { Grid, Image } from "semantic-ui-react";
import CardPhoto from "./CardPhoto";

const InfinitePhotos = props => {
  return (
    <Grid stackable container columns={2}>
      <Grid.Column>
        <CardPhoto />
      </Grid.Column>
      <Grid.Column>
        <CardPhoto />
      </Grid.Column>
      <Grid.Column>
        <CardPhoto />
      </Grid.Column>
      <Grid.Column>
        <CardPhoto />
      </Grid.Column>
    </Grid>
  );
};

export default InfinitePhotos;
