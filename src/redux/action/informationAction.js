import * as actionType from "./action-types";
import $http from "@/http";
const initialInformationAction = {
  saveToken: payload => {
    return {
      type: actionType.SAVE_TOKEN,
      payload,
    };
  },
  initialUserInformation: async () => {
    let payload = null;
    try {
      const { data = null } = await $http.get("/user_info");
      payload = data;
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
