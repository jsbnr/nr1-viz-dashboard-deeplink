import React from "react";
import { AutoSizer } from "nr1";
import DeepLink from "./components/DeepLink";

const Viz = ({  }) => {

  return (
    <AutoSizer>
      {({ width, height }) => {
        return (
          <DeepLink />
        );
      }}
    </AutoSizer>
  );
};

export default Viz;