import { getAxios } from "../utils/get-axios";
export const login = async ({ email, password }) => {
  const { axios } = getAxios();

  const url = `/auth/login`;

  const response = await axios.post(url, { email, password });

  return response;
};

export const register = async ({
  email,
  username,
  password,
  password_confirmation,
  mobile_number,
}) => {
  const { axios } = getAxios();

  const url = `/auth/register`;

  const response = await axios.post(url, {
    email,
    username,
    password,
    password_confirmation,
    mobile_number,
  });

  return response;
};
