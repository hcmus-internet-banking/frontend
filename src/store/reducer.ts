import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import transferReducer from "./transfer";

export const rootReducer = combineReducers({
  auth: authReducer,
  transfer: transferReducer,
});
