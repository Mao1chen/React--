import React from "react";
import { Routes, Route, useLocation, useParams, useNavigate } from "react-router-dom";
import routeMerge from "./routeMerge";
import { constant } from "@/utils";
import LazyLoading from "@/component/LazyLoading";
import { KeepAlive } from "react-activation";

const Element = props => {
  let { component: Component, meta, beforeEnter = () => {}, beforeLeave = null } = props;
  let { title = "Error" } = meta || {};
  document.title = `${constant.VIEW_TITLE} - ${title}`;
  const location = useLocation(),
    params = useParams(),
    navigate = useNavigate();
  return <Component {...{ location, params, navigate, beforeEnter, beforeLeave }} />;
};
const RouterView = () => {
  return (
    <React.Suspense fallback={<LazyLoading />}>
      <Routes>
        {routeMerge.map(next => {
          let { name, path, component } = next;
          if (name === "home") {
            return (
              <Route
                key={name}
                path={path}
                element={
                  <KeepAlive>
                    <Element component={component} {...next} />
                  </KeepAlive>
                }
              ></Route>
            );
          }
          return <Route key={name} path={path} element={<Element component={component} {...next} />}></Route>;
        })}
      </Routes>
    </React.Suspense>
  );
};

export default RouterView;
