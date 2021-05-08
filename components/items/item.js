import { dayjs, trimString, twoDecimalPlaces } from "../../utils";

export default function Item({ item }) {
  return (
    <div className="cursor-pointer">
      <p className="font-bold text-2xl md:text-3xl text-gray-800 capitalize">
        {item.name}
      </p>
      <p className="text-gray-600 capitalize md:text-lg">{`${item.user.first_name} ${item.user.last_name}`}</p>

      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <p className="font-normal text-sm md:text-base text-gray-500 leading-none my-2">
            {trimString(item.simple_description)}
          </p>

          <p className="font-normal text-xs text-gray-500">
            {dayjs(item.created_at).fromNow()}
          </p>
        </div>
        <div className="col-span-1 flex flex-col justify-center items-center text-gray-800 -mt-12">
          <p className="text-base md:text-2xl">
            B$ {twoDecimalPlaces(item.price)}
          </p>
          <button className="py-1 px-4 mt-1 md:py-2 md:px-6 bg-primary-300 text-sm md:text-xl text-primary-800 font-semibold hover:bg-primary-400 hover:text-primary-900 transition duration-100 ease-out ">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
