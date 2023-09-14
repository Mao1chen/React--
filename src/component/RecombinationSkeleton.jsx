import React from "react";
import { Skeleton } from "antd-mobile";
import PropTypes from "prop-types";
const RecombinationSkeleton = ({ line, onOff }) => {
  return (
    <>
      {onOff ? <Skeleton.Title /> : null}
      <Skeleton.Paragraph lineCount={line} animated />
    </>
  );
};
RecombinationSkeleton.defaultProps = {
  line: 3,
  onOff: true,
};
RecombinationSkeleton.propTypes = {
  line: PropTypes.number,
  onOff: PropTypes.bool,
};

export default RecombinationSkeleton;
