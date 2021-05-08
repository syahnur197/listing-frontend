import Head from "next/head";
import SearchBar from "../components/forms/search-bar";
import Item from "../components/items/item";
import Logo from "../components/shared/logo";
import { dayjs } from "../utils";

const items = [
  {
    id: 1,
    name: "Hello",
    price: "1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non luctus odio. Morbi ut sem a sem consequat viverra eget in orci. Aenean imperdiet dui ut orci finibus ullamcorper. ",
    sold: false,
    created_at: "2021-05-08T09:08:32.229Z",
    updated_at: "2021-05-08T09:08:32.229Z",
    user: {
      id: 0,
      first_name: "admin",
      last_name: "admin",
    },
  },
  {
    id: 2,
    name: "Hello",
    price: "1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non luctus odio. Morbi ut sem a sem consequat viverra eget in orci. Aenean imperdiet dui ut orci finibus ullamcorper. ",
    sold: false,
    created_at: "2021-05-08T09:08:32.229Z",
    updated_at: "2021-05-08T09:08:32.229Z",
    user: {
      id: 0,
      first_name: "admin",
      last_name: "admin",
    },
  },
  {
    id: 3,
    name: "Hello",
    price: "1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non luctus odio. Morbi ut sem a sem consequat viverra eget in orci. Aenean imperdiet dui ut orci finibus ullamcorper. ",
    sold: false,
    created_at: "2021-05-08T09:08:32.229Z",
    updated_at: "2021-05-08T09:08:32.229Z",
    user: {
      id: 0,
      first_name: "admin",
      last_name: "admin",
    },
  },
  {
    id: 4,
    name: "Hello",
    price: "1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non luctus odio. Morbi ut sem a sem consequat viverra eget in orci. Aenean imperdiet dui ut orci finibus ullamcorper. ",
    sold: false,
    created_at: "2021-05-08T09:08:32.229Z",
    updated_at: "2021-05-08T09:08:32.229Z",
    user: {
      id: 0,
      first_name: "admin",
      last_name: "admin",
    },
  },
  {
    id: 5,
    name: "Hello",
    price: "1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non luctus odio. Morbi ut sem a sem consequat viverra eget in orci. Aenean imperdiet dui ut orci finibus ullamcorper. ",
    sold: false,
    created_at: "2021-05-08T09:08:32.229Z",
    updated_at: "2021-05-08T09:08:32.229Z",
    user: {
      id: 0,
      first_name: "admin",
      last_name: "admin",
    },
  },
];

export default function Home() {
  return (
    <div className="bg-white font-sans">
      <Head>
        <title>BruListing</title>
      </Head>
      <div className="flex flex-col bg-primary-100 pt-16 pb-8 rounded-b-md px-4">
        <Logo />
        <SearchBar />
      </div>
      <div className="md:w-1/2 md:mx-auto p-4 ">
        <p className="text-xs text-gray-500 font-thin mb-4">
          Page 1 of 200 items
        </p>
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="bg-white shadow overflow-hidden px-6 py-4"
            >
              <Item item={item} />
            </li>
          ))}
        </ul>
        <button className="mt-8 mb-4 py-4 w-full bg-primary-300 text-primary-800 text-2xl font-bold">
          Next Page
        </button>
      </div>
      <div className="w-full border-t border-primary-100 my-2" />
    </div>
  );
}
