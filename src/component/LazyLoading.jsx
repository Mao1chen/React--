import React from "react";
import { Mask } from "antd-mobile";
const LazyLoading = () => {
  return (
    <Mask color='white' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={require("@/assets/images/loading.gif")} alt='loading' />
    </Mask>
  );
};

export default LazyLoading;
