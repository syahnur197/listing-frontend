import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: [],
  pagination: {
    total: 0,
    page_size: 0,
    number_of_pages: 0,
    current_page: 0,
    next_page: 0,
    previous_page: 0,
  },
};

export const carResultsSlice = createSlice({
  name: "carResults",
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
});

export const { setCars, setPagination } = carResultsSlice.actions;

export const selectCars = (state) => {
  return {
    cars: state.carResults.cars,
  };
};

export const selectPagination = (state) => {
  return {
    pagination: state.carResults.pagination,
  };
};

const carResultsReducer = carResultsSlice.reducer;

export default carResultsReducer;
