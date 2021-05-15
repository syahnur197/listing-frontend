import { PlusIcon } from "@heroicons/react/solid";
import CarsBanner from "../../components/cars/cars-banner";
import CarsList from "../../components/cars/cars-list";
import GridContainer from "../../components/shared/grid-container";
import SelectMenu from "../../components/shared/select-menu";
import { bodyTypes, brands, fuelTypes, transmissions, driveTypes } from "../../dummy-data/car";
import { useGetCars, useGetFilteredCar } from "../../hooks/api/cars";
import Link from "next/link";
import { Button } from "../../components/shared/buttons";
import {
  setBrand,
  setBodyType,
  setFuelType,
  setTransmission,
  setDriveType,
  getFilterCarState,
  getFiltration,
  resetFilterAsync,
} from "../../lib/reducers/filter-car-slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Cars({ results }) {
  const [_results, _setResults] = useState(0);

  useEffect(() => {
    _setResults(results);
  });

  const filterCar = useSelector(getFilterCarState);

  const propertiesToFilter = useSelector(getFiltration);

  const getFilteredCars = async () => {
    const results = await useGetFilteredCar(propertiesToFilter);
    _setResults(results);
  };

  const dispatch = useDispatch();

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
            />
            <SelectMenu
              label="Body Type"
              selections={bodyTypes}
              selectedValue={filterCar.bodyType}
              onSelectedValue={(selectedValue) => dispatch(setBodyType(selectedValue))}
            />
            <SelectMenu
              label="Fuel Type"
              selections={fuelTypes}
              selectedValue={filterCar.fuelType}
              onSelectedValue={(selectedValue) => dispatch(setFuelType(selectedValue))}
            />
            <SelectMenu
              label="Transmission"
              selections={transmissions}
              selectedValue={filterCar.transmission}
              onSelectedValue={(selectedValue) => dispatch(setTransmission(selectedValue))}
            />
            <SelectMenu
              label="Drive Type"
              selections={driveTypes}
              selectedValue={filterCar.driveType}
              onSelectedValue={(selectedValue) => dispatch(setDriveType(selectedValue))}
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
              Page {_results?.pagination?.current_page} out of{" "}
              {_results?.pagination?.number_of_pages}
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

          <CarsList cars={_results?.cars} />

          <div className="grid grid-cols-2 gap-4">
            <div>
              {_results?.pagination?.previous_page && (
                <Link href={`/cars?page=${_results?.pagination?.previous_page}`}>
                  <a>
                    <Button buttonStyle="primary" className="mt-4 mb-4 md:mt-8 ">
                      Previous Page
                    </Button>
                  </a>
                </Link>
              )}
            </div>
            <div>
              {_results?.pagination?.next_page && (
                <Link href={`/cars?page=${_results?.pagination?.next_page}`}>
                  <a>
                    <Button buttonStyle="primary" className="mt-4 mb-4 md:mt-8 ">
                      Next Page
                    </Button>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="hidden md:block lg:col-span-3"></div>
      </GridContainer>
    </>
  );
}

export async function getServerSideProps(context) {
  const { page } = context.query;

  console.log(page);

  const results = await useGetCars(page);

  return {
    props: { results },
  };
}
