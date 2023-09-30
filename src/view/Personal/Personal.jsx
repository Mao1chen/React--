import React from "react";
import RecombinationNavBar from "@/component/RecombinationNavBar";
import { List, Modal } from "antd-mobile";
import { connect } from "react-redux";
import { $localSave, useToast } from "@/utils";
import { initialInformationAction, collectAction } from "@/redux/action";
import style from "./personal.module.less";

const Personal = ({ navigate, userInfo, cleanUserInformation, cleanCollectSyncAction }) => {
  const clickHooksLogout = async () => {
    const result = await Modal.confirm({
      title: "提示",
      content: "确定要退出登录吗？",
    });
    if (result) {
      $localSave.delete("authorization");
      cleanUserInformation();
      cleanCollectSyncAction();
      useToast.success("退出成功");
      navigate("/login", { replace: true });
    }
  };
  return (
    <>
      <RecombinationNavBar title='个人中心' />
      <main className={style.mainCont}>
        <img src={userInfo?.pic || ""} alt='pictrue' className={style.avatar} onClick={() => navigate("/changePerson")} />
        <span className={style.name}>{userInfo?.name}</span>
      </main>
      <List>
        <List.Item onClick={() => navigate("/collect")}>我的收藏</List.Item>
        <List.Item onClick={() => clickHooksLogout()}>退出登录</List.Item>
      </List>
    </>
  );
};

export default connect(({ informationReducer }) => ({ userInfo: informationReducer.userInfo }), { cleanUserInformation: initialInformationAction.cleanUserInformation, cleanCollectSyncAction: collectAction.cleanCollectSyncAction })(Personal);
