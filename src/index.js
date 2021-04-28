import Env from "./components/Env"
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

console.log(`${Env.description} is set`)

ReactDOM.render(<App />, document.getElementById("root"));
