import React from "react";
import "./login.less";
import $http from "@/http";
import { connect } from "react-redux";
import { initialInformationAction } from "@/redux/action";
import { validateMessages, useCommonValidator, constant, useToast, $localSave } from "@/utils";
import { Form, Input, Button } from "antd-mobile";
import RecombinationNavBar from "@/component/RecombinationNavBar";
let timer = null;
const Login = ({ initialUserInformation, navigate, params, saveToken }) => {
  const [formInstance] = Form.useForm();
  const [authCodeStatue, setAuthCodeStatus] = React.useState(false),
    [buttonMessage, setButtonMessage] = React.useState("获取验证码");

  const clickLoginHooks = async ({ phone, code }) => {
      try {
        useToast.loading("登录中...");
        const { token } = await $http.get(`/login?phone=${phone}&code=${code}`);
        $localSave.save("authorization", token);
        await initialUserInformation(token);
        saveToken(token);
        useToast.success("登录成功");
        let redirect = params?.redirect;
        navigate(redirect ? `/${redirect}` : "/", { replace: true });
      } catch (exception) {
        throw exception;
      }
    },
    clickSendCodeHooks = async () => {
      if (authCodeStatue) return;
      try {
        await formInstance.validateFields(["phone"]);
        useToast.loading("发送验证码中");
        const phone = formInstance.getFieldValue("phone");
        const { code } = await $http.get(`/phone_code?phone=${phone}`);
        !code && useToast.success("发送成功！");
        setAuthCodeStatus(true);
        let countDown = 21;
        timer = setInterval(() => {
          countDown--;
          if (countDown === 0) {
            clearInterval(timer);
            setAuthCodeStatus(false);
            setButtonMessage("获取验证码");
            return;
          }
          setButtonMessage(`${countDown}秒后可获取验证码`);
        }, 1000);
      } catch (exception) {
        throw exception;
      }
    };
  React.useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }, []);
  return (
    <>
      <RecombinationNavBar title={"登陆/注册"} />
      <main className='login-cot'>
        <Form
          layout='horizontal'
          initialValues={{ phone: "", code: "" }}
          onFinish={result => clickLoginHooks(result)}
          validateMessages={validateMessages}
          footer={
            <Button color='primary' type='submit' size='large' block>
              登陆
            </Button>
          }
          style={{ "--border-top": "none" }}
          form={formInstance}
        >
          <Form.Item name='phone' label='手机号' rules={[{ validator: (_, value) => useCommonValidator(value, constant.REG_REGULAR.phoneReg, "手机号格式不正确") }]}>
            <Input placeholder='请输入手机号' clearable type='number' />
          </Form.Item>
          <Form.Item
            name='code'
            label='验证码'
            rules={[{ validator: (_, value) => useCommonValidator(value, constant.REG_REGULAR.codeReg, "验证码只能输入6位数字") }]}
            extra={
              <a onClick={() => clickSendCodeHooks()} style={{ color: !authCodeStatue ? "#1677ff" : "#ccc" }}>
                {buttonMessage}
              </a>
            }
          >
            <Input placeholder='请输入验证码' type='number' />
          </Form.Item>
        </Form>
        <aside className='hint-cot'>未注册的手机号将自动注册</aside>
      </main>
    </>
  );
};

export default connect(null, initialInformationAction)(Login);
