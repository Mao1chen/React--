import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import redux from "./redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "lib-flexible";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={redux}>
      <App />
    </Provider>
  </BrowserRouter>
);
