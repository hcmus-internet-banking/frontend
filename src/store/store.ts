import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./reducer";

export const rootStore = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});
