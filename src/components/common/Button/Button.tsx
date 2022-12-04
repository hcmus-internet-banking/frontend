import React from "react";
import classNames from "classnames";

// common button props
type Props = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  type?: "button" | "submit";
};

function Button({
  leftIcon,
  className,
  type,
  children,
  disabled,
  onClick,
}: Props) {
  return (
    <button
      className={classNames(
        "rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-opacity-80",
        "px-10 transition-[transform,box-shadow] hover:-translate-y-0.5",
        className,
        "shadow-md hover:shadow-lg hover:shadow-blue-600"
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
    </button>
  );
}

export default Button;
