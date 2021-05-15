import { PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarsBanner from "../components/cars/cars-banner";
import CarsList from "../components/cars/cars-list";
import { Button } from "../components/shared/buttons";
import GridContainer from "../components/shared/grid-container";
import Pagination from "../components/shared/pagination";
import SelectMenu from "../components/shared/select-menu";
import { bodyTypes, brands, driveTypes, fuelTypes, transmissions } from "../dummy-data/car";
import { useGetCars, useGetFilteredCar } from "../hooks/api/cars";
import useDidMountEffect from "../hooks/useDidMountEffect";
import { selectPagination, setCars, setPagination } from "../lib/reducers/cars-result-slice";
import {
  getFilterCarState,
  getFiltration,
  resetFilterAsync,
  setBodyType,
  setBrand,
  setDriveType,
  setFuelType,
  setTransmission,
} from "../lib/reducers/filter-car-slice";

export default function Cars({ results }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCars(results.cars));
    dispatch(setPagination(results.pagination));
  }, [results]);

  const { pagination } = useSelector(selectPagination);

  const filterCar = useSelector(getFilterCarState);

  const propertiesToFilter = useSelector(getFiltration);

  const getFilteredCars = async () => {
    const _results = await useGetFilteredCar(propertiesToFilter);
    dispatch(setCars(_results.cars));
    dispatch(setPagination(_results.pagination));
  };

  return (
    <>
      <CarsBanner>{/* <SearchBar /> */}</CarsBanner>
      <GridContainer>
        <div className="hidden md:block lg:col-span-3 px-4 py-8">
          <div className="py-4 px-8">
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

            <Button buttonStyle="primary" onClick={getFilteredCars}>
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
        <div className="col-span-12 lg:col-span-6 p-4">
          <div className="flex flex-row justify-between py-2 pb-4 items-center">
            <p className="text-xs md:text-sm text-gray-500 font-thin">
              Page {pagination?.current_page} out of {pagination?.number_of_pages}
            </p>
            <Link href="/cars/add">
              <a className="flex bg-primary-300 text-primary-800 hover:bg-primary-400 hover:text-primary-900 py-1 pl-1 pr-2 md:py-2 md:px-4 text-base md:text-lg font-medium ">
                <PlusIcon
                  className="h-5 w-5 md:h-7 md:w-7 text-primary-500 group-hover:text-primary-400 mr-2"
                  aria-hidden="true"
                />
                Add Car
              </a>
            </Link>
          </div>

          <CarsList />

          <Pagination
            next_page={pagination?.next_page}
            previous_page={pagination?.previous_page}
            page_link="/"
          />
        </div>
        <div className="hidden md:block lg:col-span-3"></div>
      </GridContainer>
    </>
  );
}

export async function getServerSideProps(context) {
  const { page } = context.query;

  const results = await useGetCars(page);

  return {
    props: { results },
  };
}
