import SearchBar from "../components/forms/search-bar";
import Item from "../components/items/item";
import ItemsBanner from "../components/items/items-banner";
import { Button } from "../components/shared/buttons";
import Link from "next/link";
import { items } from "../dummy-data/items";
import Container from "../components/shared/container";

export default function Home() {
  return (
    <>
      <ItemsBanner>
        <SearchBar />
      </ItemsBanner>
      <Container>
        <p className="text-xs md:text-sm text-gray-500 font-thin mb-4">
          Page 1 of 200 items
        </p>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              className="bg-white shadow overflow-hidden px-6 py-4 border hover:border-primary-300"
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
