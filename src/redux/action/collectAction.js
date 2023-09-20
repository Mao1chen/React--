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
  async removeCollectAsyncAction(id) {
    let payload;
    try {
      payload = await $http.get(`/store_remove?id=${id}`);
    } catch (exception) {
      throw exception;
    }
    return { type: ActionTypes.REMOVE_COLLECT, payload };
  },
};

export default collectAction;
