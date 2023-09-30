import React from "react";
import "./index.less";
import Permission from "./component/Permission";
import RouterView from "./router/RouterView";
import { AliveScope } from "react-activation";

const App = () => {
  return (
    <>
      <Permission>
        <AliveScope>
          <RouterView />
        </AliveScope>
      </Permission>
    </>
  );
};

export default App;
