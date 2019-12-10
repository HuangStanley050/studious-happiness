import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const Spinner = () => {
  return (
    <div>
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    </div>
  );
};

export default Spinner;
