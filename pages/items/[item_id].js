import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ItemsBanner from "../../components/items/items-banner";
import Container from "../../components/shared/container";
import { items } from "../../dummy-data/items";
import { Modal } from "../../components/shared/modals";
import useSendWhatsAppMessage from "../../hooks/states/useSendWhatsAppMessage";

function SellerInformation({ item, setModalShown, inquiry, setInquiry }) {
  return (
    <>
      <div className="bg-white shadow overflow-hidden mt-8">
        <div className="bg-white px-4 py-2 border-t border-b border-gray-200 sm:px-6">
          <h3 className="font-semibold text-lg text-gray-800">
            Seller's Information
          </h3>
        </div>
        <div className="border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                {item?.user.first_name} {item?.user.last_name}
              </dd>
            </div>
            {/* The reason why I hid the mobile number is due to security concern, it's better to handle it on the backend */}
            {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Phone Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                {item?.user.mobile_number}
              </dd>
            </div> */}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Contact via WhatsApp
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                <textarea
                  className="w-full text-gray-700 text-sm border-gray-200"
                  value={inquiry}
                  onChange={(event) => setInquiry(event.target.value)}
                ></textarea>
                <button
                  className="mt-2 mb-2 py-1 md:py-2 w-full text-base md:text-lg font-bold transition duration-100 ease-out bg-[#25D366] flex flex-row justify-center items-center"
                  onClick={() => setModalShown(true)}
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

function ItemInformation({ item }) {
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
            {item?.name}
          </h3>
        </div>
        <div className="border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Price</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                B$ {item?.price}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item?.description}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}

export default function ItemPage({ item }) {
  const [modalShown, setModalShown] = useState(false);

  const inquiry = `I would like to inquiry about ${item?.name}`;

  const [_inquiry, _setInquiry, sendWhatsappMessage] =
    useSendWhatsAppMessage(inquiry);

  return (
    <>
      <Modal
        title="Send Inquiry"
        message="Are you sure you want to send the inquiry? You will be redirected to different website"
        handleClick={() => sendWhatsappMessage(item?.user?.mobile_number)}
        modalShown={modalShown}
        setModalShown={setModalShown}
        okButtonText={"Okay"}
      />
      <ItemsBanner size="small"></ItemsBanner>
      <Container>
        <ItemInformation item={item} />
        <SellerInformation
          item={item}
          setModalShown={setModalShown}
          inquiry={_inquiry}
          setInquiry={_setInquiry}
        />
      </Container>
    </>
  );
}

export async function getStaticProps(context) {
  const { item_id } = context.params;
  const item = items.find((_item) => _item.id.toString() === item_id);

  if (!item) {
    return {
      props: { item },
      notFound: true,
    };
  }

  return {
    props: { item },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const paths = items.map((item) => {
    return {
      params: {
        item_id: item?.id.toString(),
      },
    };
  });

  return { paths, fallback: true };
}
