import React from "react";
import classNames from "classnames";
import { IoCloseCircle, IoEye, IoEyeOff } from "react-icons/io5";
import useToggle from "../../../lib/common/hooks/useToggle";

type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password";
  placeholder?: string;
  className?: string;
  clearable?: boolean;
  hiddenable?: boolean;
};

function Input({
  value,
  placeholder,
  type,
  onChange,
  className,
  clearable = true,
  hiddenable = false,
}: Props) {
  const handleClearClick = () => {
    onChange &&
      onChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
  };
  const { toggle: toggleHidden, value: hiddenValue } = useToggle(false);

  return (
    <label className="relative block">
      <input
        value={value}
        onChange={onChange}
        type={hiddenValue ? "text" : type}
        className={classNames(
          "peer rounded-xl bg-gray-200 px-3 outline-none transition-[padding,box-shadow] focus:shadow-md",
          className,
          {
            "pt-4 pb-3": placeholder,
            "pt-3 pb-3": !placeholder,
          }
        )}
        placeholder=" "
      />
      <span className="absolute left-3 top-1 text-xs text-gray-500 transition-[top,font-size] placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs">
        {placeholder}
      </span>

      <span className="absolute right-4 top-5 flex cursor-pointer gap-1">
        {clearable && (
          <span
            onClick={handleClearClick}
            className={classNames("cursor-pointer", {
              hidden: !value?.length,
            })}
            aria-label="Clear"
          >
            <IoCloseCircle width={24} height={24} className="text-gray-500" />
          </span>
        )}
        {hiddenable && (
          <span
            className={classNames("cursor-pointer", {
              hidden: !value?.length,
            })}
            onClick={toggleHidden}
            aria-label="Toggle password visibility"
          >
            {/* <IoEye width={24} height={24} className="text-gray-500" /> */}
            {hiddenValue ? (
              <IoEye width={24} height={24} className="text-gray-500" />
            ) : (
              <IoEyeOff width={24} height={24} className="text-gray-500" />
            )}
          </span>
        )}
      </span>
    </label>
  );
}

export default Input;
