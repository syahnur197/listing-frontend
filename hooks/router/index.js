import { useRouter } from "next/router";

/**
 * Get the current page path name
 *
 * @returns string currentPathName
 */
export function useGetPathName() {
  const router = useRouter();

  const currentPathName = router.pathname;

  return currentPathName;
}

/**
 * Pass array of paths
 * @param array array
 * @returns boolean
 */
export function useCurrentPathIs(array) {
  const currentPathName = useGetPathName();

  return array.includes(currentPathName);
}
