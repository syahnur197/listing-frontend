import { Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  bodyTypes,
  brands,
  driveTypes,
  fuelTypes,
  paymentTerms,
  transmissions,
} from "../../dummy-data/car";
import { addCar } from "../../hooks/api/cars";
import {
  setDangerNotification,
  setSuccessNotification,
} from "../../lib/reducers/notification-slice";
import DropZone from "../shared/drop-zone";
import SelectMenu from "../shared/select-menu";
import ValidationError from "../shared/validation-error";

export default function AddCar() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [uploadedImages, setUploadedImages] = useState([]);

  const handleClickCancel = () => {
    router.back();
  };

  const currentYear = new Date().getFullYear();

  return (
    <Formik
      initialValues={{
        brand: brands[0].name,
        model: "",
        body_type: bodyTypes[0].name,
        fuel_type: fuelTypes[0].name,
        drive_type: driveTypes[0].name,
        transmission: transmissions[0].name,
        year: currentYear - 7,
        mileage: "",
        price: "",
        payment_term: paymentTerms[0].name,
        colour: "",
        description: "",
      }}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        try {
          const formData = new FormData();
          for (const [key, value] of Object.entries(values)) {
            formData.append(key, value);
          }

          uploadedImages.map((uploadedImage) => {
            formData.append("images", uploadedImage);
          });

          const data = await addCar(formData);

          if (data?.car) {
            dispatch(
              setSuccessNotification({ title: "Success!", message: "Successfully added new car!" })
            );

            setTimeout(() => {
              router.push("/");
            }, 2000);
          }
        } catch (error) {
          if (error?.response?.status === 401) {
            dispatch(
              setDangerNotification({
                title: "Unauthorised!",
                message: "Please try to re-login!",
              })
            );

            setSubmitting(false);
            return;
          }

          if (!error?.response?.data?.errors) {
            dispatch(
              setDangerNotification({
                title: "Something is not right!",
                message: "Please contact us to resolve this issue!",
              })
            );

            return;
          }

          const { errors } = error?.response?.data;

          errors.forEach((_error) => {
            setFieldError(_error.param, _error.msg);
          });

          setSubmitting(false);

          dispatch(
            setDangerNotification({
              title: "Something is not right!",
              message: "Please re-check your car detail!",
            })
          );
        }
      }}
    >
      {(props) => (
        <form className="space-y-4">
          <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-2">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Car Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Brief detail of your car</p>
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
                  <DropZone setUploadedImages={setUploadedImages} />
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
                  <SelectMenu
                    selections={brands}
                    className="max-w-xl"
                    selectedValue={props.values.brand}
                    onSelectedValue={(selectedValue) => props.setFieldValue("brand", selectedValue)}
                  />
                  <ValidationError errorMessage={props.errors.brand} />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Model
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="model"
                    id="model"
                    value={props.values.model}
                    onChange={(event) => {
                      props.setFieldValue("model", event.target.value);
                    }}
                    className="max-w-xl block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300"
                  />
                  <ValidationError errorMessage={props.errors.model} />
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
                  <SelectMenu
                    selections={bodyTypes}
                    className="max-w-xl"
                    selectedValue={props.values.body_type}
                    onSelectedValue={(selectedValue) =>
                      props.setFieldValue("body_type", selectedValue)
                    }
                  />
                  <ValidationError errorMessage={props.errors.body_type} />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                <label
                  htmlFor="transmission"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Transmission
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <SelectMenu
                    selections={transmissions}
                    className="max-w-xl"
                    selectedValue={props.values.transmission}
                    onSelectedValue={(selectedValue) =>
                      props.setFieldValue("transmission", selectedValue)
                    }
                  />
                  <ValidationError errorMessage={props.errors.transmission} />
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
                  <SelectMenu
                    selections={fuelTypes}
                    className="max-w-xl"
                    selectedValue={props.values.fuel_type}
                    onSelectedValue={(selectedValue) =>
                      props.setFieldValue("fuel_type", selectedValue)
                    }
                  />
                  <ValidationError errorMessage={props.errors.fuel_type} />
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
                  <SelectMenu
                    selections={driveTypes}
                    className="max-w-xl"
                    selectedValue={props.values.drive_type}
                    onSelectedValue={(selectedValue) =>
                      props.setFieldValue("drive_type", selectedValue)
                    }
                  />
                  <ValidationError errorMessage={props.errors.drive_type} />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Year
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    min={currentYear - 40}
                    max={currentYear}
                    value={props.values.year}
                    onChange={(event) => {
                      props.setFieldValue("year", event.target.value);
                    }}
                    type="number"
                    name="year"
                    id="year"
                    className="max-w-xl block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300"
                  />
                  <ValidationError errorMessage={props.errors.year} />
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
                    min="0"
                    type="number"
                    name="mileage"
                    id="mileage"
                    value={props.values.mileage}
                    onChange={(event) => {
                      props.setFieldValue("mileage", event.target.value);
                    }}
                    className="max-w-xl block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300"
                  />
                  <ValidationError errorMessage={props.errors.mileage} />
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
                    min="0"
                    type="number"
                    name="price"
                    id="price"
                    value={props.values.price}
                    onChange={(event) => {
                      props.setFieldValue("price", event.target.value);
                    }}
                    className="max-w-xl block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300"
                  />
                  <ValidationError errorMessage={props.errors.price} />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                <label
                  htmlFor="drive_type"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Payment Term
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <SelectMenu
                    selections={paymentTerms}
                    className="max-w-xl"
                    selectedValue={props.values.payment_term}
                    onSelectedValue={(selectedValue) =>
                      props.setFieldValue("payment_term", selectedValue)
                    }
                  />
                  <ValidationError errorMessage={props.errors.payment_term} />
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
                    value={props.values.colour}
                    onChange={(event) => {
                      props.setFieldValue("colour", event.target.value);
                    }}
                    className="max-w-xl block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300"
                  />
                  <ValidationError errorMessage={props.errors.colour} />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Seller's Note
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    name="description"
                    id="description"
                    className="resize-none max-w-xl block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300"
                    rows="10"
                    value={props.values.description}
                    onChange={(event) => {
                      props.setFieldValue("description", event.target.value);
                    }}
                  ></textarea>
                  <ValidationError errorMessage={props.errors.description} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                onClick={handleClickCancel}
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </button>
              <button
                disabled={props.isSubmitting}
                onClick={props.handleSubmit}
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
