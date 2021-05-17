import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: null,
  bodyType: null,
  fuelType: null,
  driveType: null,
  transmission: null,
  minimumPrice: 0,
  maximumPrice: 0,
  minimumMileage: 0,
  maximumMileage: 0,
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
      state.minimumPrice = 0;
      state.maximumPrice = 0;
      state.minimumMileage = 0;
      state.maximumMileage = 0;
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

  if (!!state.filterCar.brand) {
    filtrations.push({
      key: "brand",
      operator: "=",
      value: state.filterCar.brand,
    });
  }

  if (!!state.filterCar.bodyType) {
    filtrations.push({
      key: "body_type",
      operator: "=",
      value: state.filterCar.bodyType,
    });
  }

  if (!!state.filterCar.fuelType) {
    filtrations.push({
      key: "fuel_type",
      operator: "=",
      value: state.filterCar.fuelType,
    });
  }

  if (!!state.filterCar.driveType) {
    filtrations.push({
      key: "drive_type",
      operator: "=",
      value: state.filterCar.driveType,
    });
  }

  if (!!state.filterCar.transmission) {
    filtrations.push({
      key: "transmission",
      operator: "=",
      value: state.filterCar.transmission,
    });
  }

  if (!!state.filterCar.minimumPrice) {
    filtrations.push({
      key: "price",
      operator: ">=",
      value: state.filterCar.minimumPrice,
    });
  }

  // dont sent maximum price if equal to 0
  if (!!state.filterCar.maximumPrice) {
    filtrations.push({
      key: "price",
      operator: "<=",
      value: state.filterCar.maximumPrice,
    });
  }

  if (!!state.filterCar.minimumMileage) {
    filtrations.push({
      key: "mileage",
      operator: ">=",
      value: state.filterCar.minimumMileage,
    });
  }

  // dont sent maximum mileage if equal to 0
  if (!!state.filterCar.maximumMileage) {
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
