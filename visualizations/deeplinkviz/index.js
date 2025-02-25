import React, { useState } from "react";
import { PlatformStateContext, NerdletStateContext } from "nr1";
import Viz from "./Viz";

const ExampleViz = (props) => {
  return (
    <div style={{ height: "100%" }}>
      <PlatformStateContext.Consumer>
        {(platformContextState) => (
          <NerdletStateContext.Consumer>
            {(nerdletContextState) => (
                <Viz
                  platformState={platformContextState}
                  // platformState 
                  nerdletState={nerdletContextState}
    
                />
            )}
          </NerdletStateContext.Consumer>
        )}
      </PlatformStateContext.Consumer>
    </div>
  );
};

export default ExampleViz;