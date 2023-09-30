import React from "react";
import { connect } from "react-redux";
import { initialInformationAction } from "@/redux/action";
import { constant, useToast } from "@/utils";
import { ExclamationOutline } from "antd-mobile-icons";
import { useLocation, useNavigate } from "react-router-dom";

const Permission = ({ children, userInfo, authorization, initialUserInformation }) => {
  const path = useLocation().pathname,
    navigate = useNavigate();

  React.useEffect(() => {
    if (authorization && path == "/login") {
      useToast.useDefined("您已经登陆", ExclamationOutline);
      navigate("/");
    }

    if (authorization && !userInfo) {
      (async () => {
        try {
          await initialUserInformation();
        } catch (exception) {
          throw exception;
        }
      })();
    }

    if (!authorization && constant.ROUTES_WHITE.includes(path)) {
      useToast.error("请先登陆");
      navigate(`/login${path}`, { replace: true });
    }
    document.documentElement.scrollTo(0, 0);
  }, [path]);

  return <>{children}</>;
};

export default connect(({ informationReducer }) => informationReducer, initialInformationAction)(Permission);
