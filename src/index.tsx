import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

if (process.env.NODE_ENV === "development") {
  require("./mocks/browser");
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
