import React from "react";
import classNames from "classnames";
import { ScaleLoader } from "react-spinners";
import { presets } from "./Button.preset";

// common button props
type Props = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
  type?: "button" | "submit";
  preset?: keyof typeof presets;
};

function Button({
  leftIcon,
  className,
  type,
  children,
  disabled,
  isLoading,
  onClick,
  preset = "filled",
}: Props) {
  return (
    <button
      className={classNames(
        "flex h-10 items-center justify-center rounded-xl  px-4 py-2 font-semibold  hover:bg-opacity-80",
        "px-10 transition-[transform,box-shadow] hover:-translate-y-0.5",
        className,
        {
          "cursor-not-allowed opacity-50": disabled,
        },
        preset && presets[preset]?.classNames,
        preset && presets[preset]?.shadow
      )}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
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
