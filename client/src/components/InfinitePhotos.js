import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid, Image } from "semantic-ui-react";
import CardPhoto from "./CardPhoto";

const InfinitePhotos = props => {
  const [cards, setCards] = useState([
    { name: "yo" },
    { name: "tim" },
    { name: "peter" }
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
            <CardPhoto key={card.name} />;
          </Grid.Column>
        );
      })}
    </InfiniteScroll>
  );
};

export default InfinitePhotos;

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
