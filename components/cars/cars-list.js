import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCars } from "../../lib/reducers/cars-result-slice";
import Car from "./car";

function EmptyCar() {
  return (
    <div className="bg-white shadow overflow-hidden border hover:border-primary-300">
      <div className="cursor-pointer flex flex-col md:grid md:grid-cols-12">
        <div className="py-40 md:py-40 mb-4 lg:mb-0 bg-gray-300 flex place-content-center md:col-span-4 animate-pulse"></div>
        <div className="p-4 md:col-span-8">
          <div className="bg-gray-300 w-full py-4 mb-4 animate-pulse"></div>
          <div className="bg-gray-300 w-full py-24 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default function CarsList() {
  const { cars } = useSelector(selectCars);

  if (!cars) {
    return (
      <div className="space-y-4">
        <EmptyCar />
        <EmptyCar />
        <EmptyCar />
        <EmptyCar />
        <EmptyCar />
        <EmptyCar />
        <EmptyCar />
        <EmptyCar />
        <EmptyCar />
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-4">
        {cars?.map((car, index) => (
          <li
            key={index}
            className="bg-white shadow overflow-hidden border hover:border-primary-300"
          >
            <Link href={`/cars/${car.id}`}>
              <a>
                <Car car={car} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
