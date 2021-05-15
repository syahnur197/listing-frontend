import { getAxios } from "../utils/get-axios";
export const login = async ({ email, password }) => {
  const { axios } = getAxios();

  const url = `/auth/login`;

  const response = await axios.post(url, { email, password });

  return response;
};
