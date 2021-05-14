import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../reducers/modal-slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
  devTools: false,
});
