import { BACKEND_URL } from "./config";

const axios = require("axios");

export const getAxios = () => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = BACKEND_URL;
  return { axios };
};
