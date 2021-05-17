import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CarsBanner from "../../components/cars/cars-banner";
import Container from "../../components/shared/container";
import { getCars, getCarById } from "../../hooks/api/cars";
import useSendWhatsAppMessage from "../../hooks/states/useSendWhatsAppMessage";
import { dayjs, formatThousand } from "../../lib/utils";
import Image from "next/image";
import { AWS_CDN } from "../../lib/utils/config";
import { useEffect, useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import { NextSeo } from "next-seo";

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
  const carImages = JSON.parse(car?.images) ?? [];

  const getMainImgSrc = (image) => `https://${AWS_CDN}/${image.filePath}/750.webp`;

  const imagesArray = carImages?.map((carImage) => {
    return {
      url: getMainImgSrc(carImage),
      height: 500,
      width: 750,
      alt: `${car.brand} ${car.model}`,
    };
  });

  const [mainImgIndex, setMainImgIndex] = useState(0);

  const [url, setUrl] = useState("");

  useEffect(function mount() {
    setUrl(window.location.href);
  });

  return (
    <>
      <NextSeo
        openGraph={{
          url: url,
          title: `${car.brand} ${car.model}`,
          description: car.description,
          images: imagesArray,
        }}
      />
      <div className="bg-white shadow overflow-hidden mb-4 md:px-6 md:py-5">
        {!car?.images && (
          <div className="py-32 md:py-64 bg-gray-200 flex place-content-center">
            <p className="text-lg">Insert Image Here</p>
          </div>
        )}

        {car?.images && (
          <>
            <div className="mb-4 lg:mb-0 flex place-content-center md:col-span-4 ">
              {/* Load all of the main images container as well */}
              {carImages.map((image, index) => (
                <div
                  className={index === mainImgIndex ? "block" : "hidden"}
                  key={getMainImgSrc(image)}
                >
                  <Image src={getMainImgSrc(image)} height={750} width={1200} loading="eager" />
                </div>
              ))}
            </div>
            {/* Load all images thumbnail */}
            <div className="grid grid-cols-5 gap-2 mt-2">
              {carImages.length > 1 &&
                carImages.map((image, index) => (
                  <div
                    key={getMainImgSrc(image)}
                    className="cursor-pointer filter hover:brightness-150 transition duration-150 ease-in"
                    onClick={() => {
                      setMainImgIndex(index);
                    }}
                    onMouseEnter={() => {
                      setMainImgIndex(index);
                    }}
                  >
                    <Image
                      src={`https://${AWS_CDN}/${image.filePath}/300.webp`}
                      height={300}
                      width={300}
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>

      {/* Social Shares */}
      <div className="flex flex-row py-2 gap-2 items-center justify-center">
        <FacebookShareButton url={url}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <WhatsappShareButton
          url={url}
          title={`BruListing: ${car?.brand} ${car?.model}`}
          separator=":: "
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        <TwitterShareButton url={url} title={`BruListing: ${car?.brand} ${car?.model}`}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <TelegramShareButton url={url} title={`BruListing: ${car?.brand} ${car?.model}`}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
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
  const { car } = await getCarById(car_id);

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
  const { cars } = await getCars(-1);

  const paths = cars.map((car) => {
    return {
      params: { car_id: car.id.toString() },
    };
  });

  return { paths, fallback: "blocking" };
}
