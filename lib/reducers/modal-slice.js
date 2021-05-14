import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: null,
  message: null,
  modalShown: false,
  handleClick: null,
  okButtonText: "Okay",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.modalShown = true;
      state.handleClick = action.payload.handleClick;
      state.okButtonText = action.payload.okButtonText || "Okay";
    },
    closeModal: (state) => {
      state.modalShown = false;
    },
    setModal: (state, action) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.modalShown = action.payload.modalShown;
      state.handleClick = action.payload.handleClick;
      state.okButtonText = action.payload.okButtonText || "Okay";
    },
  },
});

export const { openModal, setModal, closeModal } = modalSlice.actions;

export const selectModal = (state) => {
  return {
    title: state.modal.title,
    message: state.modal.message,
    modalShown: state.modal.modalShown,
    handleClick: state.modal.handleClick,
    okButtonText: state.modal.okButtonText,
  };
};

const modalReducer = modalSlice.reducer;

export default modalReducer;

// Define a thunk that dispatches those action creators
export const cleanupModalAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(
      setModal({
        modalShown: false,
        title: null,
        message: null,
        handleClick: null,
        okButtonText: "Okay",
      })
    );
  }, 500);
};
