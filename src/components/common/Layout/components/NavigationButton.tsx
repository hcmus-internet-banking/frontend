import classNames from "classnames";
import { IconType } from "react-icons";

type Props = { className: string; onClick?: VoidFunction; icon?: IconType };

function NavigationButton({ className, onClick, icon }: Props) {
  const Icon = icon;

  return (
    <a onClick={onClick} className="block">
      <div
        className={classNames(
          "aspect-square w-14 transform cursor-pointer rounded-xl bg-red-400 p-2 transition duration-300 ease-in-out hover:scale-110",
          className
        )}
      >
        {Icon && <Icon className="h-full w-full p-2" color="white" />}
      </div>
    </a>
  );
}

export default NavigationButton;
