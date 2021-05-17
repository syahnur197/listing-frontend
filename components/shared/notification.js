import { Fragment, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { ExclamationCircleIcon, XIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { getNotification, resetNotification } from "../../lib/reducers/notification-slice";

export default function Notification() {
  const dispatch = useDispatch();
  const notification = useSelector(getNotification);

  useEffect(() => {
    if (!notification.isShown) {
      return;
    }

    setTimeout(() => {
      dispatch(resetNotification());
    }, 3000);
  }, [notification]);

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-start px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={notification.isShown}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={`max-w-sm w-full bg-primary-100 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${
                notification.type === "success" ? "bg-primary-100" : "bg-red-100"
              }`}
            >
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {notification.type === "success" && (
                      <CheckCircleIcon
                        className={`h-6 w-6 ${
                          notification.type === "success" ? "text-primary-600" : "text-red-600"
                        }`}
                        aria-hidden="true"
                      />
                    )}
                    {notification.type === "danger" && (
                      <ExclamationCircleIcon
                        className={`h-6 w-6 ${
                          notification.type === "success" ? "text-primary-600" : "text-red-600"
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p
                      className={`text-sm font-semibold ${
                        notification.type === "success" ? "text-primary-900" : "text-red-900"
                      }`}
                    >
                      {notification.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className={`rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        notification.type === "success"
                          ? "focus:ring-primary-500"
                          : "focus:ring-red-500"
                      } `}
                      onClick={() => {
                        dispatch(resetNotification());
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
