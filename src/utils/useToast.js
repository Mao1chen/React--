import { Toast } from "antd-mobile";
class useToast {
  constructor() {
    Toast.config({ maskClickable: false });
  }
  loading(content) {
    Toast.show({ icon: "loading", content, duration: 0 });
  }
  success(content, duration = 2000) {
    Toast.show({ icon: "success", content, duration });
  }
  error(content, duration = 2000) {
    Toast.show({ icon: "fail", content, duration });
  }
  useDefinedLoading(content, Icon) {
    Toast.show({ icon: <Icon />, content, duration: 0 });
  }
  useDefined(content, Icon, duration = 2000) {
    Toast.show({ icon: <Icon />, content, duration });
  }
  overallSituation() {
    Toast.clear();
  }
}
export default new useToast();
