import useSWR from "swr";
import { getFetcher } from "../../lib/get-fetcher";
import { BACKEND_URL } from "../../lib/utils/config";

export function useGetCars(page = 1) {
  const url = `${BACKEND_URL}/cars?page=${page}`;

  const fetcher = getFetcher();

  const { data, error, isValidating } = useSWR(url, fetcher);

  return { data, error, isValidating };
}
