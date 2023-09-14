import React from "react";
import "./index.less";
import Permission from "./component/Permission";
import RouterView from "./router/RouterView";
const App = () => {
  return (
    <>
      <Permission>
        <RouterView />
      </Permission>
    </>
  );
};

export default App;
