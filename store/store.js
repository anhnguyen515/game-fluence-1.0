import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import themeSlice from "./slices/themeSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [themeSlice.name]: themeSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
