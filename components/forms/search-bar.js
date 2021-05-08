import { SearchIcon } from "@heroicons/react/solid";

export default function SearchBar() {
  return (
    <div>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          name="search_term"
          id="search_term"
          className="focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
          placeholder="Search item..."
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-primary-500" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
