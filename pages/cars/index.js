import { PlusIcon } from "@heroicons/react/solid";
import SearchBar from "../../components/forms/search-bar";
import CarsBanner from "../../components/cars/cars-banner";
import CarsList from "../../components/cars/cars-list";
import GridContainer from "../../components/shared/grid-container";
import SelectMenu from "../../components/shared/select-menu";
import {
  bodyTypes,
  brands,
  fuelTypes,
  transmissions,
  driveTypes,
} from "../../dummy-data/car";
import { useGetCars } from "../../hooks/api/cars";
import Link from "next/link";
import { Button } from "../../components/shared/buttons";

export default function Cars({ results }) {
  const { cars, pagination } = results;
  return (
    <>
      <CarsBanner>{/* <SearchBar /> */}</CarsBanner>
      <GridContainer>
        <div className="hidden md:block lg:col-span-3 px-4 py-8">
          <div className="py-4 px-8">
            <SelectMenu label="Brand" selections={brands} />
            <SelectMenu label="Body Type" selections={bodyTypes} />
            <SelectMenu label="Fuel Type" selections={fuelTypes} />
            <SelectMenu label="Transmission" selections={transmissions} />
            <SelectMenu label="Drive Type" selections={driveTypes} />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 p-4">
          <div className="flex flex-row justify-between py-2 pb-4 items-center">
            <p className="text-xs md:text-sm text-gray-500 font-thin">
              Page {pagination?.current_page} out of{" "}
              {pagination?.number_of_pages}
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
          <CarsList cars={cars} />

          <Link href={`/cars?page=${pagination.next_page}`}>
            <a>
              <Button buttonStyle="primary">Next Page</Button>
            </a>
          </Link>
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
