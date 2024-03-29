import classNames from "classnames";
import { memo } from "react";
import { RxCaretDown } from "react-icons/rx";

type SelectProps = {
  options: {
    value: string;
    label: string;
  }[];
  title?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  name?: string;
  error?: string;
  height?: string;
} & React.ComponentPropsWithoutRef<"select">;

function Select({
  options,
  title,
  value,
  onChange,
  name,
  height,
}: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        className={classNames(
          "w-full appearance-none rounded-xl border bg-white px-3 pt-4 pb-3 outline-none transition-[padding,box-shadow] focus:shadow-md",
          {
            "h-12": !height,
            "h-16": height === "h-16",
          }
        )}
        value={value}
        onChange={onChange}
        name={name}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="absolute left-3 top-1 select-none text-xs text-gray-500 transition-[top,font-size] placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs">
        {title || "Account Number"}
      </span>
      <div className="absolute right-4 top-4">
        <RxCaretDown />
      </div>
    </div>
  );
}

export default memo(Select);
