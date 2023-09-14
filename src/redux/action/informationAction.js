import * as actionType from "./action-types";
import $http from "@/http";
const initialInformationAction = {
  saveToken: payload => {
    return {
      type: actionType.SAVE_TOKEN,
      payload,
    };
  },
  initialUserInformation: async authorization => {
    let payload = null;
    try {
      const { data } = await $http.get("/user_info");
      payload = data;
      this.saveToken(authorization);
    } catch (exception) {
      throw exception;
    }
    return {
      type: actionType.INITIAL_USER_INFORMATION,
      payload,
    };
  },
};

export default initialInformationAction;
