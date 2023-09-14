import React from "react";

const BackTheTop = React.memo(() => {
  const [showSwitch, setShowSwitch] = React.useState(false);
  const styles = { display: showSwitch ? "block" : "none", width: 50, height: 50, position: "fixed", left: 10, bottom: 40, zIndex: 9999 };
  addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight / 2) {
      setShowSwitch(true);
    } else {
      setShowSwitch(false);
    }
  });
  return (
    <div style={styles} onClick={() => window.scrollTo(0, 0)}>
      <img src={require("@/assets/images/backTop.png")} alt='返回顶部' title='back top' style={{ width: 50, height: 50, boxShadow: "0px,0px,3px,#eee" }} />
    </div>
  );
});

export default BackTheTop;
