import React, { memo } from "react";
import classnames from "classnames";
import { IoCloseCircle } from "react-icons/io5";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import useToggle from "../../../lib/common/hooks/useToggle";
import { BeatLoader } from "react-spinners";

type Props = {
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password";
  placeholder?: string;
  className?: string;
  clearable?: boolean;
  hiddenable?: boolean;
  name?: string;
  error?: string;
  autoComplete?: string;
  disabled?: boolean;
  isLoading?: boolean;
  outerClassNames?: string;
  required?: boolean;
} & React.ComponentPropsWithoutRef<"input">;

function Input({
  value,
  placeholder,
  type,
  onChange,
  className,
  autoComplete,
  clearable = true,
  hiddenable = false,
  name,
  error,
  isLoading,
  outerClassNames,
  disabled,
  required = true,
  ...props
}: Props) {
  const handleClearClick = () => {
    if (onChange && name) {
      onChange({
        target: { value: "", name: name },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };
  const { toggle: toggleHidden, value: hiddenValue } = useToggle(false);

  return (
    <div className={outerClassNames}>
      <label className="relative inline-block w-full">
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={hiddenValue ? "text" : type}
          autoComplete={autoComplete}
          className={classnames(
            "peer w-full rounded-xl bg-gray-200 px-3 outline-none transition-[padding,box-shadow] focus:shadow-md",
            className,
            {
              "pt-4 pb-3": placeholder,
              "pt-3 pb-3": !placeholder,
              "cursor-not-allowed bg-gray-300": disabled,
            }
          )}
          disabled={disabled}
          placeholder=" "
          {...props}
        />
        <span className="absolute left-3 top-1 select-none text-xs text-gray-500 transition-[top,font-size] placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs">
          {placeholder} {required && <span className="text-red-500">*</span>}
        </span>

        {!disabled && (
          <span className="absolute right-4 top-4 flex cursor-pointer items-center gap-1">
            {clearable && onChange && !!value?.length && (
              <span
                onClick={handleClearClick}
                className={classnames("cursor-pointer")}
                aria-label="Clear"
              >
                <IoCloseCircle className="h-5 w-5 text-gray-500" />
              </span>
            )}
            {hiddenable && (
              <span
                className={classnames("cursor-pointer", {
                  hidden: !value?.length,
                })}
                onClick={toggleHidden}
                aria-label="Toggle password visibility"
              >
                {/* <IoEye width={24} height={24} className="text-gray-500" /> */}
                {hiddenValue ? (
                  <RxEyeOpen className="h-5 w-5 text-gray-500" />
                ) : (
                  <RxEyeClosed className="h-5 w-5 text-gray-500" />
                )}
              </span>
            )}
            {isLoading && (
              <span>
                <BeatLoader size="4px" />
              </span>
            )}
          </span>
        )}
      </label>

      {error && (
        <div
          className={classnames("mt-1 text-xs text-red-500 transition", {
            "text-[0px]": !error,
            "ml-3": error,
          })}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default memo(Input);
