import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCars } from "../../lib/reducers/cars-result-slice";
import Car from "./car";

export default function CarsList() {
  const { cars } = useSelector(selectCars);

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
