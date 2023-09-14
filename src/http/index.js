import axios from "axios";
import baseURL from "./config";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { $localSave } from "@/utils";
import { Toast } from "antd-mobile";
const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json; charset=UTF-8",
  },
});
instance.interceptors.request.use(
  config => {
    nprogress.start();
    const authorization = $localSave.gain("authorization");
    if (authorization) config.headers["authorization"] = authorization;
    return config;
  },
  error => Promise.reject(error)
);
instance.interceptors.response.use(
  response => {
    const { code = 0, data = response, msg = "Net Work Success" } = response;
    nprogress.done();
    switch (code) {
      case 0:
        return data;
      case 1:
        return Promise.reject({ message: msg });
      case -2:
        // 退出登录逻辑
        break;
      default:
        return Promise.reject({ message: "网络超时" });
    }
  },
  error => {
    nprogress.done();
    Toast.show({ content: "网络超时", icon: "fail" });
    return Promise.reject(error);
  }
);
class $http {
  constructor() {}
  async get(url) {
    return instance.get(url);
  }
  async post(url, params = {}) {
    return instance.post(url, params);
  }
  async delete(url) {
    return instance.delete(url);
  }
  async put(url, params = {}) {
    return instance.put(url, params);
  }
}

export default new $http();
