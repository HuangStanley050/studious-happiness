import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const Spinner = () => (
  <div>
    <Segment>
      <Dimmer active>
        <Loader style={{ color: "red" }} size="big" content="Loading" />
      </Dimmer>
    </Segment>
  </div>
);

export default Spinner;
