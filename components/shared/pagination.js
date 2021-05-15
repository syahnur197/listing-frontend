import Link from "next/link";
import { Button } from "./buttons";

export default function Pagination({ next_page, previous_page, page_link }) {
  const next_page_link = `${page_link}?page=${next_page}`;
  const previous_page_link = `${page_link}?page=${previous_page}`;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        {previous_page && (
          <Link
            prefetch
            href={{ pathname: page_link, query: { page: previous_page } }}
            as={previous_page_link}
          >
            <a>
              <Button buttonStyle="primary" className="mt-4 mb-4 md:mt-8 ">
                Previous Page
              </Button>
            </a>
          </Link>
        )}
      </div>
      <div>
        {next_page && (
          <Link
            prefetch
            href={{ pathname: page_link, query: { page: next_page } }}
            as={next_page_link}
          >
            <a>
              <Button buttonStyle="primary" className="mt-4 mb-4 md:mt-8 ">
                Next Page
              </Button>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
