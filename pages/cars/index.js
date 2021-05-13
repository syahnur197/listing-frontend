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

export default function Cars() {
  return (
    <>
      <CarsBanner>
        <SearchBar />
      </CarsBanner>
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
          <CarsList />
        </div>
        <div className="hidden md:block lg:col-span-3"></div>
      </GridContainer>
    </>
  );
}
