import ItemsBanner from "../../components/items/items-banner";
import Badge from "../../components/shared/badge";
import Container from "../../components/shared/container";
import { items } from "../../dummy-data/items";

function SellerInformation({ user }) {
  return (
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
              {user.first_name} {user.last_name}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
              +6738885555
            </dd>
          </div>
        </dl>
      </div>
    </div>
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
            <div className="flex space-x-1">
              {item.tags.map((tag) => (
                <Badge>{tag}</Badge>
              ))}
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}

export default function ItemPage({ item }) {
  return (
    <>
      <ItemsBanner size="small"></ItemsBanner>
      <Container>
        <ItemInformation item={item} />
        <SellerInformation user={item.user} />
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
