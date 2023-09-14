import React from "react";
import { NavBar } from "antd-mobile";
import PropTypes from "prop-types";
const RecombinationNavBar = React.memo(({ title }) => {
  const clickBackHooks = () => {};
  return (
    <>
      <NavBar onBack={() => clickBackHooks()}>{title}</NavBar>
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
