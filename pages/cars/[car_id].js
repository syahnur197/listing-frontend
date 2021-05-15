import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CarsBanner from "../../components/cars/cars-banner";
import Container from "../../components/shared/container";
import { useGetCarById, useGetCars } from "../../hooks/api/cars";
import useSendWhatsAppMessage from "../../hooks/states/useSendWhatsAppMessage";
import { dayjs, formatThousand } from "../../lib/utils";

function SellerInformation({ car }) {
  const inquiry = `I would like to inquiry about ${car?.brand} ${car?.model}`;

  const [_inquiry, _setInquiry, handleSendWhatsAppMessage] = useSendWhatsAppMessage(inquiry);

  return (
    <>
      <div className="bg-white shadow overflow-hidden mt-8">
        <div className="bg-white px-4 py-2 border-t border-b border-gray-200 sm:px-6">
          <h3 className="font-semibold text-lg text-gray-800">Seller's Information</h3>
        </div>
        <div className="border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                {car?.user?.username}
              </dd>
            </div>
            {/* The reason why I hid the mobile number is due to security concern, it's better to handle it on the backend */}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Contact via WhatsApp</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                <textarea
                  className="w-full text-gray-700 text-sm border-gray-200"
                  value={_inquiry}
                  onChange={(event) => _setInquiry(event.target.value)}
                ></textarea>
                <button
                  className="mt-2 mb-2 py-1 md:py-2 w-full text-base md:text-lg font-bold transition duration-100 ease-out bg-[#25D366] flex flex-row justify-center items-center"
                  onClick={() => handleSendWhatsAppMessage(car?.user?.mobile_number)}
                >
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    className="mr-1 text-white text-2xl md:text-3xl"
                  />
                  Send
                </button>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}

function CarInformation({ car }) {
  return (
    <>
      <div className="bg-white shadow overflow-hidden mb-4 md:px-6 md:py-5">
        <div className="py-32 md:py-64 bg-gray-200 flex place-content-center">
          <p className="text-lg">Insert Image Here</p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden">
        <div className="bg-white px-4 py-5 border-t border-b border-gray-200 sm:px-6">
          <h3 className="font-bold text-2xl md:text-3xl text-gray-800 capitalize">
            {car?.brand} {car?.model}
          </h3>
          <p className="font-normal text-sm text-gray-500 mt-2">
            Posted at: {dayjs(car?.created_at).fromNow()}
          </p>
        </div>
        <div className="border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Price</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                B$ {formatThousand(car?.price)}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Mileage</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {formatThousand(car?.mileage)} km
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Body Type</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{car?.body_type}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Fuel Type</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{car?.fuel_type}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Transmission</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {car?.transmission}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Drive Type</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {car?.drive_type}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-words">
                {car?.description}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}

export default function CarPage({ car }) {
  return (
    <>
      <CarsBanner size="small"></CarsBanner>
      <Container>
        <CarInformation car={car} />
        <SellerInformation car={car} />
      </Container>
    </>
  );
}

export async function getStaticProps(context) {
  const { car_id } = context.params;
  const { car } = await useGetCarById(car_id);

  if (!car) {
    return {
      props: { car },
      notFound: true,
    };
  }

  return {
    props: { car },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const { cars } = await useGetCars(-1);

  const paths = cars.map((car) => {
    return {
      params: { car_id: car.id.toString() },
    };
  });

  return { paths, fallback: "blocking" };
}
