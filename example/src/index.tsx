import * as React from "react";
import * as ReactDom from "react-dom";
import gamWrapper from "gamwrapper";

import { Hello } from "./components/hello";

new gamWrapper();

ReactDom.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById( "example" )
);
