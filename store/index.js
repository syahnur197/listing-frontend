import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../reducers/modal-slice";
import { REDUX_DEVTOOL_ENABLE } from "../utils/config";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
  devTools: REDUX_DEVTOOL_ENABLE,
});
