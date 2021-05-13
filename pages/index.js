import { PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";
import SearchBar from "../components/forms/search-bar";
import Item from "../components/items/item";
import ItemsBanner from "../components/items/items-banner";
import { Button } from "../components/shared/buttons";
import Container from "../components/shared/container";
import { items } from "../dummy-data/items";

export default function Home() {
  return (
    <>
      <ItemsBanner>
        <SearchBar />
      </ItemsBanner>
      <Container>
        <div className="flex flex-row justify-between py-2 pb-4 items-center">
          <p className="text-xs md:text-sm text-gray-500 font-thin">
            Page 1 of 200 items
          </p>
          <button className="flex bg-primary-300 text-primary-800 hover:bg-primary-400 hover:text-primary-900 py-1 pl-1 pr-2 md:py-2 md:px-4 border border-transparent text-base md:text-lg font-medium ">
            <PlusIcon
              className="h-5 w-5 md:h-7 md:w-7 text-primary-500 group-hover:text-primary-400 mr-2"
              aria-hidden="true"
            />
            Add Item
          </button>
        </div>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              className="bg-white shadow overflow-hidden border hover:border-primary-300"
            >
              <Link href={`/items/${item.id}`}>
                <a>
                  <Item item={item} />
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <Button buttonStyle="primary">Next Page</Button>
      </Container>
    </>
  );
}
