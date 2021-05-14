import { configureStore } from "@reduxjs/toolkit";
import filterCarReducer from "../reducers/filter-car-slice";
import modalReducer from "../reducers/modal-slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    filterCar: filterCarReducer,
  },
  devTools: true,
});
