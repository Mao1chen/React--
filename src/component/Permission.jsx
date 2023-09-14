import React, { useEffect } from "react";
import { $localSave, constant } from "@/utils";
import { Toast } from "antd-mobile";
import { ExclamationOutline } from "antd-mobile-icons";
import { useLocation, useNavigate } from "react-router-dom";

const Permission = ({ children }) => {
  const authentication = $localSave.gain("authentication"),
    path = useLocation().pathname,
    navigate = useNavigate();
  useEffect(() => {
    if (authentication && path == "/login") {
      Toast.show({ icon: <ExclamationOutline />, content: "您已经登陆" });
      navigate("/");
    }
    if (!authentication && constant.ROUTES_WHITE.includes(path)) {
      Toast.show({ icon: "fail", content: "请先登陆" });
      navigate("/login");
    }
  }, []);
  return <>{children}</>;
};

export default Permission;
