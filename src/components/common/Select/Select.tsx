import { RxCaretDown } from "react-icons/rx";
import { memo } from "react";

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
} & React.ComponentPropsWithoutRef<"select">;

function Select({ options, title, value, onChange, name }: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        className="h-12 w-full appearance-none rounded-xl bg-gray-200 px-3 pt-4 pb-3 outline-none transition-[padding,box-shadow] focus:shadow-md"
        value={value}
        onChange={onChange}
        name={name}
      >
        {/* <option value="1">Internal</option>
        <option value="2">External</option> */}
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
