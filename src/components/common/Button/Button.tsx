import React from "react";
import classNames from "classnames";
import { ScaleLoader } from "react-spinners";
import { presets } from "./Button.preset";

type Props = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
  type?: "button" | "submit";
  preset?: keyof typeof presets;
  size?: "sm" | "md" | "lg";
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
  size = "md",
}: Props) {
  return (
    <button
      className={classNames(
        "flex items-center justify-center rounded-lg py-2 hover:bg-opacity-80",
        "transition-[transform,box-shadow] hover:-translate-y-0.5",
        {
          "cursor-not-allowed opacity-50": disabled,
          "px-4": !className?.includes("px-"),
          "h-8 text-sm": size === "sm",
          "h-10": size === "md",
          "h-[3.25rem]": size === "lg",
        },
        preset && presets[preset]?.classNames,
        preset && presets[preset]?.shadow,
        className
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
