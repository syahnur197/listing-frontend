import { configureStore } from "@reduxjs/toolkit";
import carResultsReducer from "../reducers/cars-result-slice";
import filterCarReducer from "../reducers/filter-car-slice";
import modalReducer from "../reducers/modal-slice";
import notificationReducer from "../reducers/notification-slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    filterCar: filterCarReducer,
    carResults: carResultsReducer,
    notification: notificationReducer,
  },
  devTools: true,
});
