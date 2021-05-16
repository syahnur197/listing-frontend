const axios = require("axios");
export const getFetcher = () => (url) => axios.get(url).then((res) => res.data);
