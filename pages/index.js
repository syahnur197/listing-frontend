import { PlusIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarsBanner from "../components/cars/cars-banner";
import CarsList from "../components/cars/cars-list";
import { Button } from "../components/shared/buttons";
import GridContainer from "../components/shared/grid-container";
import NumberRange from "../components/shared/number-range";
import Pagination from "../components/shared/pagination";
import SelectMenu from "../components/shared/select-menu";
import { bodyTypes, brands, driveTypes, fuelTypes, transmissions } from "../dummy-data/car";
import { useGetCars } from "../hooks/api/cars";
import { getFilteredCars } from "../lib/backend-api/cars";
import { selectPagination, setCars, setPagination } from "../lib/reducers/cars-result-slice";
import {
  getFilterCarState,
  getFiltration,
  resetFilterAsync,
  setBodyType,
  setBrand,
  setDriveType,
  setFuelType,
  setMaximumMileage,
  setMaximumPrice,
  setMinimumMileage,
  setMinimumPrice,
  setTransmission,
} from "../lib/reducers/filter-car-slice";

export default function Cars() {
  const router = useRouter();
  const query = router.query;
  const { page } = query;
  const { data, error, isValidating } = useGetCars(page ?? 1);
  const [session, loading] = useSession();

  const [_showFilter, _setShowFilter] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCars(data?.cars));
    dispatch(setPagination(data?.pagination));
  }, [data]);

  const { pagination } = useSelector(selectPagination);

  const filterCar = useSelector(getFilterCarState);

  const propertiesToFilter = useSelector(getFiltration);

  const filterCars = async () => {
    _setShowFilter(false);
    const filteredResults = await getFilteredCars(propertiesToFilter);
    dispatch(setCars(filteredResults.cars));
    dispatch(setPagination(filteredResults.pagination));
  };

  return (
    <>
      <CarsBanner size="small">{/* <SearchBar /> */}</CarsBanner>
      <GridContainer>
        {/* Car filter */}
        <div className="col-span-12 lg:col-span-3 px-4 py-4 md:py-8">
          <div className="col-span-12 block md:hidden">
            <button
              onClick={() => {
                _setShowFilter(!_showFilter);
              }}
              className="py-1 w-full text-sm transition duration-100 ease-out bg-primary-300 text-primary-800 hover:bg-primary-400 hover:text-primary-900"
            >
              Toggle Filter
            </button>
          </div>
          <div
            className={`
              py-4 md:px-8 px-2 mt-4 md:mt-0 -mx-2
              border border-gray-100 md:border-none
              shadow-md md:shadow-none
              md:block ${_showFilter ? "" : "hidden"}`}
          >
            <SelectMenu
              label="Brand"
              selections={brands}
              selectedValue={filterCar.brand}
              onSelectedValue={(selectedValue) => dispatch(setBrand(selectedValue))}
              className="mb-6"
            />
            <SelectMenu
              label="Body Type"
              selections={bodyTypes}
              selectedValue={filterCar.bodyType}
              onSelectedValue={(selectedValue) => dispatch(setBodyType(selectedValue))}
              className="mb-6"
            />
            <SelectMenu
              label="Fuel Type"
              selections={fuelTypes}
              selectedValue={filterCar.fuelType}
              onSelectedValue={(selectedValue) => dispatch(setFuelType(selectedValue))}
              className="mb-6"
            />
            <SelectMenu
              label="Transmission"
              selections={transmissions}
              selectedValue={filterCar.transmission}
              onSelectedValue={(selectedValue) => dispatch(setTransmission(selectedValue))}
              className="mb-6"
            />
            <SelectMenu
              label="Drive Type"
              selections={driveTypes}
              selectedValue={filterCar.driveType}
              onSelectedValue={(selectedValue) => dispatch(setDriveType(selectedValue))}
              className="mb-6"
            />

            {/* Price and Mileage filter */}

            <div className="grid-cols-2 gap-2 mb-6 grid">
              <label className="block text-lg font-semibold text-gray-700 col-span-2">Price</label>
              <div className="col-span-1">
                <label className="block text-lg font-semibold text-gray-700">Min. </label>
                <NumberRange
                  value={filterCar.minimumPrice}
                  step={1000}
                  onClickButton={(selectedValue) => dispatch(setMinimumPrice(selectedValue))}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-lg font-semibold text-gray-700">Max. </label>
                <NumberRange
                  value={filterCar.maximumPrice}
                  step={1000}
                  onClickButton={(selectedValue) => dispatch(setMaximumPrice(selectedValue))}
                />
              </div>
            </div>

            <div className="grid-cols-2 gap-2 mb-6 grid">
              <label className="block text-lg font-semibold text-gray-700 col-span-2">
                Mileage
              </label>
              <div className="col-span-1">
                <label className="block text-lg font-semibold text-gray-700">Min. </label>
                <NumberRange
                  step={5000}
                  value={filterCar.minimumMileage}
                  onClickButton={(selectedValue) => dispatch(setMinimumMileage(selectedValue))}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-lg font-semibold text-gray-700">Max. </label>
                <NumberRange
                  step={5000}
                  value={filterCar.maximumMileage}
                  onClickButton={(selectedValue) => dispatch(setMaximumMileage(selectedValue))}
                />
              </div>
            </div>

            <Button buttonStyle="primary" onClick={filterCars}>
              Filter
            </Button>

            <Button
              onClick={() => {
                dispatch(resetFilterAsync());
              }}
              className="mt-4"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Car listings */}
        <div className="col-span-12 lg:col-span-6 px-4 md:py-4">
          <div className="flex flex-row justify-between pb-4 items-center">
            <p className="text-xs md:text-sm text-gray-500 font-thin">
              Page {pagination?.current_page} out of {pagination?.number_of_pages}
            </p>
            {session && (
              <Link href="/cars/add">
                <a className="flex bg-primary-300 text-primary-800 hover:bg-primary-400 hover:text-primary-900 py-1 pl-1 pr-2 md:py-2 md:px-4 text-base md:text-lg font-medium ">
                  <PlusIcon
                    className="h-5 w-5 md:h-7 md:w-7 text-primary-500 group-hover:text-primary-400 mr-2"
                    aria-hidden="true"
                  />
                  Add Car
                </a>
              </Link>
            )}
          </div>

          <CarsList />

          <Pagination
            next_page={pagination?.next_page}
            previous_page={pagination?.previous_page}
            page_link="/"
          />
        </div>

        {/* Empty block */}
        <div className="hidden md:block lg:col-span-3"></div>
      </GridContainer>
    </>
  );
}
