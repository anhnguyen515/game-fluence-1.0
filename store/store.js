import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import themeReducer from "./slices/themeSlice";
import userReducer from "./slices/userSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer,
      user: userReducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
