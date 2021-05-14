import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: null,
  bodyType: null,
  fuelType: null,
  driveType: null,
  transmission: null,
  minimumPrice: null,
  maximumPrice: null,
  minimumMileage: null,
  maximumMileage: null,
};

export const filterCarSlice = createSlice({
  name: "filterCar",
  initialState,
  reducers: {
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setBodyType: (state, action) => {
      state.bodyType = action.payload;
    },
    setFuelType: (state, action) => {
      state.fuelType = action.payload;
    },
    setDriveType: (state, action) => {
      state.driveType = action.payload;
    },
    setTransmission: (state, action) => {
      state.transmission = action.payload;
    },
    setMinimumPrice: (state, action) => {
      state.minimumPrice = action.payload;
    },
    setMaximumPrice: (state, action) => {
      state.maximumPrice = action.payload;
    },
    setMinimumMileage: (state, action) => {
      state.minimumMileage = action.payload;
    },
    setMaximumMileage: (state, action) => {
      state.maximumMileage = action.payload;
    },
    resetFilter: (state, action) => {
      state.brand = null;
      state.bodyType = null;
      state.fuelType = null;
      state.driveType = null;
      state.transmission = null;
      state.minimumPrice = null;
      state.maximumPrice = null;
      state.minimumMileage = null;
      state.maximumMileage = null;
    },
  },
});

export const {
  setBrand,
  setBodyType,
  setFuelType,
  setDriveType,
  setTransmission,
  setMinimumPrice,
  setMaximumPrice,
  setMinimumMileage,
  setMaximumMileage,
  resetFilter,
} = filterCarSlice.actions;

export const getFilterCarState = (state) => {
  return {
    brand: state.filterCar.brand,
    bodyType: state.filterCar.bodyType,
    fuelType: state.filterCar.fuelType,
    driveType: state.filterCar.driveType,
    transmission: state.filterCar.transmission,
    minimumPrice: state.filterCar.minimumPrice,
    maximumPrice: state.filterCar.maximumPrice,
    minimumMileage: state.filterCar.minimumMileage,
    maximumMileage: state.filterCar.maximumMileage,
  };
};

export const resetFilterAsync = () => (dispatch) => {
  dispatch(resetFilter());

  return Promise.resolve();
};

export const getFiltration = (state) => {
  const filtrations = [];

  if (state.filterCar.brand !== null) {
    filtrations.push({
      key: "brand",
      operator: "=",
      value: state.filterCar.brand,
    });
  }

  if (state.filterCar.bodyType !== null) {
    filtrations.push({
      key: "body_type",
      operator: "=",
      value: state.filterCar.bodyType,
    });
  }

  if (state.filterCar.fuelType !== null) {
    filtrations.push({
      key: "fuel_type",
      operator: "=",
      value: state.filterCar.fuelType,
    });
  }

  if (state.filterCar.driveType !== null) {
    filtrations.push({
      key: "drive_type",
      operator: "=",
      value: state.filterCar.driveType,
    });
  }

  if (state.filterCar.transmission !== null) {
    filtrations.push({
      key: "transmission",
      operator: "=",
      value: state.filterCar.transmission,
    });
  }

  if (state.filterCar.minimumPrice !== null) {
    filtrations.push({
      key: "price",
      operator: ">=",
      value: state.filterCar.minimumPrice,
    });
  }

  if (state.filterCar.maximumPrice !== null) {
    filtrations.push({
      key: "price",
      operator: "<=",
      value: state.filterCar.maximumPrice,
    });
  }

  if (state.filterCar.minimumMileage !== null) {
    filtrations.push({
      key: "mileage",
      operator: ">=",
      value: state.filterCar.minimumMileage,
    });
  }

  if (state.filterCar.maximumMileage !== null) {
    filtrations.push({
      key: "mileage",
      operator: "<=",
      value: state.filterCar.maximumMileage,
    });
  }

  return filtrations;
};

const filterCarReducer = filterCarSlice.reducer;

export default filterCarReducer;
