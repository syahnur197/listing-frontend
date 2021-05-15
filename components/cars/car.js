import { dayjs, formatThousand, twoDecimalPlaces } from "../../lib/utils";

export default function Car({ car }) {
  return (
    <div className="cursor-pointer flex flex-col md:grid md:grid-cols-12">
      <div className="py-32 md:py-32 mb-4 lg:mb-0 bg-gray-200 flex place-content-center md:col-span-4">
        <p className="text-lg">Insert Image Here</p>
      </div>
      <div className="p-4 md:col-span-8">
        <p className="font-bold text-2xl md:text-3xl text-gray-800 capitalize">
          {car?.brand} {car?.model}
        </p>
        <p className="text-gray-600 md:text-lg">
          Seller:
          <span className="inline ml-1 font-semibold capitalize">{`${car?.user?.username}`}</span>
        </p>

        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <p className="font-normal text-sm md:text-base text-gray-500 leading-none my-2">
              <span className="block">
                <span>Mileage:</span>{" "}
                <span className="font-semibold">{formatThousand(car?.mileage)} km</span>
              </span>
              <span className="block">
                <span>Body Type:</span> <span className="font-semibold">{car?.body_type}</span>
              </span>
              <span className="block">
                <span>Fuel Type:</span> <span className="font-semibold">{car?.fuel_type}</span>
              </span>
              <span className="block">
                <span>Transmission:</span>{" "}
                <span className="font-semibold">{car?.transmission}</span>
              </span>
              <span className="block">
                <span>Drive Type:</span> <span className="font-semibold">{car?.drive_type}</span>
              </span>
            </p>

            <p className="font-normal text-xs text-gray-500">{dayjs(car?.created_at).fromNow()}</p>
          </div>
          <div className="col-span-1 flex flex-col justify-center items-center text-center text-gray-800 -mt-12">
            <p className="text-base md:text-2xl">
              <span className="block">B$ {twoDecimalPlaces(car?.price)}</span>
              <span className="block text-lg text-gray-600 font-semibold">{car?.payment_term}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
