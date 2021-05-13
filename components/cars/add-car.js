import { bodyTypes, brands, driveTypes, fuelTypes } from "../../dummy-data/car";
import SelectMenu from "../shared/select-menu";

export default function AddCar() {
  return (
    <form className="space-y-4 ">
      <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-2">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Car Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Brief detail of your car
          </p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
            <label
              htmlFor="cover_photo"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Car photo
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="max-w-xl flex justify-center px-6 pt-10 pb-11 border-2 border-gray-300 border-dashed">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Brand
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <SelectMenu selections={brands} className="max-w-xl" />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
            <label
              htmlFor="body_type"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Body Type
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <SelectMenu selections={bodyTypes} className="max-w-xl" />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
            <label
              htmlFor="fuel_type"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Fuel Type
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <SelectMenu selections={fuelTypes} className="max-w-xl" />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
            <label
              htmlFor="drive_type"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Drive Type
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <SelectMenu selections={driveTypes} className="max-w-xl" />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
            <label
              htmlFor="mileage"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Mileage (km)
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="number"
                name="mileage"
                id="mileage"
                className="max-w-xl block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Price (B$)
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="number"
                name="price"
                id="price"
                className="max-w-xl block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
            <label
              htmlFor="colour"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Colour
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="colour"
                id="colour"
                className="max-w-xl block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
