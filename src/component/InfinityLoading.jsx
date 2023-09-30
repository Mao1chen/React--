import React from "react";
import PropTypes from "prop-types";
const InfinityLoading = ({ altitude, onBottomOut, children, nomore }) => {
  let baseElement = React.useRef(null);
  if (children) {
    children = React.Children.toArray(children);
  }

  React.useEffect(() => {
    let obServer = new IntersectionObserver(alter => {
      let { isIntersecting } = alter[0];
      if (isIntersecting && !nomore) {
        onBottomOut();
      }
    });
    let recombinationElement = baseElement.current;
    obServer.observe(baseElement.current);
    return () => {
      obServer.unobserve(recombinationElement);
      obServer = null;
    };
  });
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: altitude }} ref={baseElement}>
      {children ? children : `loading...`}
    </div>
  );
};
InfinityLoading.defaultProps = {
  altitude: 20,
  nomore: false,
};
InfinityLoading.propTypes = {
  altitude: PropTypes.number,
  nomore: PropTypes.bool,
  onBottomOut: PropTypes.func.isRequired,
};

export default InfinityLoading;
