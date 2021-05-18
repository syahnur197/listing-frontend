/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, memo, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import useDidMountEffect from "../../hooks/useDidMountEffect";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SelectMenu({ label = null, selections, className, selectedValue, onSelectedValue }) {
  const [selected, setSelected] = useState(selections[0]);

  // set the selected based on the value in redux on mount
  useEffect(() => {
    if (selectedValue === null) {
      return false;
    }

    const _selectedValue = selections.find((selection) => {
      return selection.name === selectedValue;
    });

    setSelected(_selectedValue);
  }, []);

  // every time the selected value (in select menu) changes,
  // update the selected state value in redux
  useDidMountEffect(() => {
    if (selected?.name === selections[0].name) {
      onSelectedValue(null);
      return false;
    }

    onSelectedValue(selected?.name);
  }, [selected]);

  // if the selected value changed to null, set selected to the first element, i.e., please select...
  // it is used for the reset filter function
  useEffect(() => {
    if (selectedValue === null) {
      setSelected(selections[0]);
    }
  }, [selectedValue]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="">
          {label && (
            <Listbox.Label className="block text-lg font-semibold text-gray-700">
              {label}
            </Listbox.Label>
          )}
          <div className={`mt-1 relative ${className}`}>
            <Listbox.Button
              className={
                " bg-white relative w-full border border-gray-300 shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              }
            >
              <span className="block truncate">{selected?.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className={
                  className +
                  " absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                }
              >
                {selections.map((selection) => (
                  <Listbox.Option
                    key={selection.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-primary-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={selection}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {selection.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-primary-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}

export default memo(SelectMenu);
