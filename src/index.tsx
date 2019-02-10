import * as React from "react";
import * as ReactDom from "react-dom";
import './components/gamwrapper';

import { Hello } from "./components/hello"

ReactDom.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById( "example" )
);