import * as ActionTypes from "../action/action-types";
const collectReducer = (
  initialState = {
    collectList: null,
  },
  { type, payload }
) => {
  const cloneState = JSON.parse(JSON.stringify(initialState));
  switch (type) {
    case ActionTypes.INITIAL_COLLECT:
      cloneState.collectList = payload;
      break;
    case ActionTypes.REMOVE_COLLECT:
      cloneState.collectList = cloneState.collectList.filter(next => +next.news.id != +payload);
      break;
    default:
      break;
  }
  return cloneState;
};

export default collectReducer;
