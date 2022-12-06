import React from "react";
import classNames from "classnames";
import { ScaleLoader } from "react-spinners";

// common button props
type Props = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
  type?: "button" | "submit";
};

function Button({
  leftIcon,
  className,
  type,
  children,
  disabled,
  isLoading,
  onClick,
}: Props) {
  return (
    <button
      className={classNames(
        "flex h-10 items-center justify-center rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-opacity-80",
        "px-10 transition-[transform,box-shadow] hover:-translate-y-0.5",
        className,
        "shadow-md hover:shadow-lg hover:shadow-blue-600",
        {
          "cursor-not-allowed opacity-50": disabled,
        }
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <>
        {isLoading ? (
          <ScaleLoader color="white" height={14} />
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
          </>
        )}
      </>
    </button>
  );
}

export default Button;
