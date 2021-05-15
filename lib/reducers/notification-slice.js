import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShown: false,
  title: "",
  message: "",
  type: "success",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    resetNotification: (state, action) => {
      state.isShown = false;
      state.type = "success";
      state.title = "";
      state.message = "";
    },
    setSuccessNotification: (state, action) => {
      state.isShown = true;
      state.type = "success";
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
    setDangerNotification: (state, action) => {
      state.isShown = true;
      state.type = "danger";
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
  },
});

export const { setSuccessNotification, setDangerNotification, resetNotification } =
  notificationSlice.actions;

export const getNotification = (state) => {
  return {
    isShown: state.notification.isShown,
    type: state.notification.type,
    title: state.notification.title,
    message: state.notification.message,
  };
};

const notificationReducer = notificationSlice.reducer;

export default notificationReducer;
