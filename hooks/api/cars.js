import { getSession } from "next-auth/client";
import useSWR from "swr";
import { getFetcher } from "../../lib/get-fetcher";
import { BACKEND_URL } from "../../lib/utils/config";
import { getAxios } from "../../lib/utils/get-axios";

export async function getCars(page = 1) {
  const url = `/cars?page=${page}`;
  const { axios } = getAxios();

  const results = (await axios.get(url)).data;
  return results;
}

export function useGetCars(page = 1) {
  const url = `${BACKEND_URL}/cars?page=${page}`;

  const fetcher = getFetcher();

  const { data, error, isValidating } = useSWR(url, fetcher);

  return { data, error, isValidating };
}

export async function useGetFilteredCar(properties, page = 1) {
  const url = `/cars/filter`;

  const { axios } = getAxios();

  try {
    const results = (
      await axios.post(url, {
        page,
        properties,
      })
    ).data;

    return results;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCarById(car_id) {
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

export async function addCar(car_detail) {
  const url = `/cars`;
  const { axios } = getAxios();

  const session = await getSession();

  const { access_token } = session;

  const headers = {
    Authorization: `Bearer ${access_token}`,
  };

  const { data } = await axios.post(url, car_detail, {
    headers,
  });

  return data;
}
