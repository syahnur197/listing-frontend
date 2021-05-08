import Head from "next/head";
import SearchBar from "../../components/forms/search-bar";
import Item from "../../components/items/item";
import styles from "../../styles/items.module.css";

const items = [
  {
    id: 1,
    name: "Hello",
    price: "1000",
    simple_description:
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
    simple_description:
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
    simple_description:
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
    simple_description:
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
    simple_description:
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
      <div
        className={`py-16 md:pt-32 md:pb-40 rounded-b-md px-4 ${styles.hero}`}
      >
        <div className="flex flex-col w-full md:w-2/5 mx-auto">
          <h1 className="font-bold text-2xl md:text-5xl text-primary-900 self-center mb-4 relative">
            Items Listing
          </h1>
          <SearchBar />
        </div>
      </div>
      <div className="md:w-1/2 md:mx-auto p-4 ">
        <p className="text-xs md:text-sm text-gray-500 font-thin mb-4">
          Page 1 of 200 items
        </p>
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="bg-white shadow overflow-hidden px-6 py-4 border hover:border-primary-300"
            >
              <Item item={item} />
            </li>
          ))}
        </ul>
        <button className="mt-8 mb-4 py-4 w-full bg-primary-300 text-primary-800 text-2xl font-bold hover:bg-primary-400 hover:text-primary-900 transition duration-100 ease-out">
          Next Page
        </button>
      </div>
      <div className="w-full border-t border-primary-100 my-2" />
    </div>
  );
}
