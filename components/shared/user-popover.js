/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useSession } from "next-auth/client";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserPopover() {
  const [session, loading] = useSession();
  return (
    <Menu as="div" className="relative inline-block text-left z-10">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="flex items-center text-primary-600 hover:text-primary-700 font-semibold">
              {session?.user?.username}
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-80 md:w-56 shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/dashboard">
                      <a className="hover:bg-gray-100 hover:text-gray-900 text-gray-700 block px-4 py-2 text-sm">
                        Account
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/api/auth/signout">
                      <a className="hover:bg-gray-100 hover:text-gray-900 text-gray-700 block px-4 py-2 text-sm">
                        Log Out
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
