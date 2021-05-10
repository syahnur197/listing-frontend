import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ItemsBanner from "../../components/items/items-banner";
import Badge from "../../components/shared/badge";
import Container from "../../components/shared/container";
import { items } from "../../dummy-data/items";
import { useRouter } from "next/router";
import { Modal } from "../../components/shared/modals";

function SellerInformation({ item, setModalShown, inquiry, setInquiry }) {
  return (
    <>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
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
                {item.user.first_name} {item.user.last_name}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Phone Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                {item.user.mobile_number}
              </dd>
            </div>
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
                  className="mt-2 mb-2 py-2 w-full text-xl font-bold transition duration-100 ease-out bg-[#25D366] flex flex-row justify-center items-center"
                  onClick={() => setModalShown(true)}
                >
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    className="mr-1 text-white text-3xl"
                  />
                  Send Text
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
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
        <div className="px-4 py-5 sm:px-6">
          <div className="py-32 bg-gray-200 flex place-content-center">
            <p className="text-lg">Insert Image Here</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="bg-white px-4 py-5 border-t border-b border-gray-200 sm:px-6">
          <h3 className="font-bold text-2xl md:text-3xl text-gray-800 capitalize">
            {item.name}
          </h3>
        </div>
        <div className="border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Price</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                B$ {item.price}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.description}
              </dd>
            </div>
            <div className="hidden py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Tags</dt>
              <dd className="flex flex-row space-x-2">
                {item.tags.map((tag, index) => (
                  <Badge key={index}>{tag}</Badge>
                ))}
              </dd>
            </div>
            <div className="flex space-x-1 md:hidden">
              {item.tags.map((tag, index) => (
                <Badge key={index}>{tag}</Badge>
              ))}
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}

export default function ItemPage({ item }) {
  const [modalShown, setModalShown] = useState(false);

  const router = useRouter();

  const [_inquiry, _setInquiry] = useState(
    `I would like to inquire about ${item.name}`
  );

  const sendWhatsappMessage = () => {
    const api_url = "https://api.whatsapp.com/send/";
    const phone = item.user?.mobile_number;
    const text = encodeURIComponent(_inquiry);

    const button_url = `${api_url}?phone=${phone}&text=${text}`;

    router.push(button_url);
  };

  return (
    <>
      <Modal
        title="Send Inquiry"
        message="Are you sure you want to send the inquiry? You will be redirected to different website"
        handleClick={sendWhatsappMessage}
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

export async function getServerSideProps(context) {
  const { item_id } = context.params;
  const item = items.find((_item) => parseInt(_item.id) === parseInt(item_id));
  return {
    props: { item },
  };
}
