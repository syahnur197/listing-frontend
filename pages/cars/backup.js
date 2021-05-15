import SearchBar from "../../components/forms/search-bar";
import ItemsBanner from "../../components/items/items-banner";
import ItemsList from "../../components/items/items-list";
import GridContainer from "../../components/shared/grid-container";

export default function Home() {
  return (
    <>
      <ItemsBanner>
        <SearchBar />
      </ItemsBanner>
      <GridContainer>
        <div className="hidden md:block lg:col-span-3 px-4 py-8"></div>
        <div className="col-span-12 lg:col-span-6 p-4">
          <ItemsList />
        </div>
        <div className="hidden md:block lg:col-span-3"></div>
      </GridContainer>
    </>
  );
}
