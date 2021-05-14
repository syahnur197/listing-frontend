import { dayjs, trimString, twoDecimalPlaces } from "../../utils";
import Badge from "../shared/badge";

export default function Item({ item }) {
  return (
    <div className="cursor-pointer flex flex-col lg:flex-row">
      <div className="py-32 md:py-32 mb-4 lg:mb-0 bg-gray-200 flex place-content-center lg:w-full">
        <p className="text-lg">Insert Image Here</p>
      </div>
      <div className="p-4">
        <p className="font-bold text-2xl md:text-3xl text-gray-800 capitalize">
          {item.name}
        </p>
        <p className="text-gray-600 md:text-lg">
          Seller:
          <span className="inline ml-1 font-semibold capitalize">{`${item.user.first_name} ${item.user.last_name}`}</span>
        </p>

        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <p className="font-normal text-sm md:text-base text-gray-500 leading-none my-2">
              {trimString(item.simple_description)}
            </p>

            <p className="font-normal text-xs text-gray-500">
              {dayjs(item.created_at).fromNow()}
            </p>
            {/* <div className="flex space-x-1 py-2">
              {item.tags.map((tag, index) => (
                <Badge key={index}>{tag}</Badge>
              ))}
            </div> */}
          </div>
          <div className="col-span-1 flex flex-col justify-center items-center text-gray-800 -mt-12">
            <p className="text-base md:text-2xl">
              B$ {twoDecimalPlaces(item.price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
