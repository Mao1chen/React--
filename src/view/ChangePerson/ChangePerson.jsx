import React from "react";
import { connect } from "react-redux";
import { Button, Input, ImageUploader } from "antd-mobile";
import { initialInformationAction } from "@/redux/action";
import {} from "./changePerson.module.less";
import { useToast } from "@/utils";
import $http from "@/http";

import RecombinationNavBar from "@/component/RecombinationNavBar";
const ChangePerson = ({ name, pic: url, initialUserInformation, navigate }) => {
  const [fileCollect, setFileCollect] = React.useState([{ url }]),
    [usename, setUsername] = React.useState(name);
  const beforeUploadHooks = file => {
      if (file.size > 1024 * 1024 * 10) {
        useToast.error("图片大小不能超过10M");
        return null;
      }
      return file;
    },
    uploadHooks = async file => {
      try {
        const { pic: url } = await $http.post(`/upload`, file);
        return { url };
      } catch (exception) {
        throw exception;
      }
    },
    clickHooksSumbmit = async () => {
      try {
        await $http.post("/user_update", { usename, pic: fileCollect[0].url });
        useToast.success(`修改成功`);
        initialUserInformation();
        navigate(-1);
      } catch (exception) {
        throw exception;
      }
    };
  return (
    <>
      <RecombinationNavBar title='修改个人资料' />
      <ImageUploader value={fileCollect} maxCount={1} beforeUpload={beforeUploadHooks} upload={uploadHooks} style={{ "--cell-size": "90px" }} />
      <Input placeholder='请输入用户名' clearable onChange={val => setUsername(val)} value={usename} />
      <Button color='primary' block onClick={clickHooksSumbmit}>
        提 交
      </Button>
    </>
  );
};

export default connect(({ informationReducer: { userInfo } }) => userInfo || {}, { initialUserInformation: initialInformationAction.initialUserInformation })(ChangePerson);
