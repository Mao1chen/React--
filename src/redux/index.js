import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import * as recombinationReducer from "./reducer";
import reduxPromise from "redux-promise";
import reduxThunk from "redux-thunk";
import reduxLogger from "redux-logger";

const reduxMiddleware = [reduxPromise, reduxThunk];

if (process.env.NODE_ENV == "development") {
  reduxMiddleware.push(reduxLogger);
}

const redux = createStore(combineReducers(recombinationReducer), applyMiddleware(...reduxMiddleware));

export default redux;
