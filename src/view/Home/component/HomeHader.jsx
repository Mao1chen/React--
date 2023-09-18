import React, { useMemo } from "react";
import style from "./HomeHeader.module.less";
import { constant } from "@/utils";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
const HomeHader = React.memo(({ today, pic }) => {
  const navigate = useNavigate();
  const message = useMemo(() => {
    return { month: constant.TRANSITIONUPPERCASEARRAYLIST[+today[1]], day: today[2] };
  }, [today]);
  const gainExtendGreetingsToHooks = () => {
    let hours = new Date().getHours();
    let text;
    if (hours >= 0 && hours <= 10) {
      text = `早上好 !`;
    } else if (hours > 10 && hours <= 14) {
      text = `中午好 !`;
    } else if (hours > 14 && hours <= 18) {
      text = `下午好 !`;
    } else if (hours > 18 && hours <= 24) {
      text = `早点休息 ！`;
    }
    return text;
  };
  return (
    <header id={style.header}>
      <div className={style.infoAppContainer}>
        <time className={style.timer}>
          <span>{message.day}</span>
          <span>{message.month}</span>
        </time>
        <span className={style.message}>{gainExtendGreetingsToHooks()}</span>
      </div>
      <img onClick={() => navigate("/personal")} src={pic ? pic : require("@/assets/images/avatar.jpg")} alt='user picture' className={style.picture} />
    </header>
  );
});

export default connect(({ informationReducer }) => informationReducer.userInfo || {}, null)(HomeHader);
