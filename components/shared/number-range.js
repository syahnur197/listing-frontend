import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { Button } from "./buttons";

export default function NumberRange({ value, className, step, onClickButton }) {
  const [_value, _setValue] = useState(0);

  const onClickMinusButton = () => {
    const newValue = _value - step;

    if (newValue < 0) return;

    _setValue(newValue);
    onClickButton(newValue);
  };

  const onClickPlusButton = () => {
    const newValue = _value + step;

    if (newValue < 0) return;

    _setValue(newValue);
    onClickButton(newValue);
  };

  useEffect(() => {
    if (parseInt(value) !== _value) {
      _setValue(value);
    }
  }, [value]);

  return (
    <div className={`grid grid-cols-5 gap-2 ${className}`}>
      <Button
        buttonStyle="primary"
        className="col-span-1 flex justify-center items-center"
        onClick={onClickMinusButton}
      >
        <MinusIcon
          className="h-5 w-5 text-primary-900 group-hover:text-primary-400"
          aria-hidden="true"
        />
      </Button>
      <input
        value={_value}
        onChange={_setValue}
        type="number"
        className="col-span-3 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 border-gray-300"
      />
      <Button
        buttonStyle="primary"
        className="col-span-1 flex justify-center items-center"
        onClick={onClickPlusButton}
      >
        <PlusIcon
          className="h-5 w-5 text-primary-900 group-hover:text-primary-400"
          aria-hidden="true"
        />
      </Button>
    </div>
  );
}
