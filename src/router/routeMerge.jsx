import React, { lazy } from "react";
import Home from "@/view/Home/Home";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
    meta: {
      title: "主页",
    },
  },
  {
    name: "login",
    path: "/login/:redirect?",
    component: lazy(() => import("@/view/Login/Login")),
    meta: {
      title: "登陆/注册",
    },
  },
  {
    name: "information",
    path: "/information/:id",
    component: lazy(() => import("@/view/information/Information")),
    meta: {
      title: "详情",
    },
  },
  {
    name: "collect",
    path: "/collect",
    component: lazy(() => import("@/view/Collect/Collect")),
    meta: {
      title: "我的收藏",
    },
  },
  {
    name: "personal",
    path: "/personal",
    component: lazy(() => import("@/view/Personal/Personal")),
    meta: {
      title: "个人中心",
    },
  },
  {
    name: "changePerson",
    path: "/changePerson",
    component: lazy(() => import("@/view/ChangePerson/ChangePerson")),
    meta: {
      title: "修改资料",
    },
    beforeEnter: () => {},
    beforeLeave: () => {},
  },
  {
    name: "404",
    path: "*",
    meta: {
      title: "Not Found 404",
    },
    component: lazy(() => import("@/view/Error404/Error404")),
  },
];

export default routes;
