import { getAxios } from "../../lib/utils/get-axios";

export async function useGetCars(page = 1) {
  const url = `/cars?page=${page}`;
  const { axios } = getAxios();

  try {
    const results = (await axios.get(url)).data;

    return results;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function useGetCarById(car_id) {
  const url = `/cars/${car_id}`;
  const { axios } = getAxios();

  try {
    const results = (await axios.get(url)).data;

    return results;
  } catch (error) {
    console.error(error);
    return false;
  }
}
