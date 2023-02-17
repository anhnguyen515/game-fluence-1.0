import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import themeReducer from "./slices/themeSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
