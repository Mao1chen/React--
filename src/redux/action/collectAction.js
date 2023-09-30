import * as ActionTypes from "./action-types";
import $http from "@/http";

const collectAction = {
  async initialCollectListAsyncAction() {
    let payload;
    try {
      const { data: response } = await $http.get("/store_list");
      payload = response;
    } catch (exception) {
      throw exception;
    }
    return { type: ActionTypes.INITIAL_COLLECT, payload };
  },
  removeCollectAsyncAction(payload) {
    return { type: ActionTypes.REMOVE_COLLECT, payload };
  },
  cleanCollectSyncAction() {
    return { type: ActionTypes.INITIAL_COLLECT, payload: null };
  },
};

export default collectAction;
