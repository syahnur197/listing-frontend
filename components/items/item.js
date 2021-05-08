import { dayjs, twoDecimalPlaces } from "../../utils";

export default function Item({ item }) {
  return (
    <>
      <p className="font-bold text-2xl text-gray-800 capitalize">{item.name}</p>
      <p className="text-gray-600 capitalize">{`${item.user.first_name} ${item.user.last_name}`}</p>

      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <p className="font-normal text-sm text-gray-500 leading-none my-2">
            {item.description}
          </p>

          <p className="font-normal text-xs text-gray-500">
            {dayjs(item.created_at).fromNow()}
          </p>
        </div>
        <div className="col-span-1 flex flex-col justify-center items-center text-gray-800 -mt-12">
          <p className="text-base">B$ {twoDecimalPlaces(item.price)}</p>
          <button className="bg-primary-300 text-sm text-primary-800 font-semibold hover:bg-primary-400 hover:text-primary-900 py-1 px-4 mt-1">
            View
          </button>
        </div>
      </div>
    </>
  );
}
