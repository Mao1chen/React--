import React from "react";
import { NavBar } from "antd-mobile";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const RecombinationNavBar = React.memo(({ title }) => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar onBack={() => navigate(-1)}>{title}</NavBar>
    </>
  );
});

RecombinationNavBar.defaultProps = {
  title: "个人中心",
};
RecombinationNavBar.propTypes = {
  title: PropTypes.string,
};

export default RecombinationNavBar;
