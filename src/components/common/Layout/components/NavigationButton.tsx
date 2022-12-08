import classNames from "classnames";
import Link from "next/link";
import { IconType } from "react-icons";
import { RxLinkNone1 } from "react-icons/rx";
import { UrlObject } from "url";

type Props = {
  className: string;
  onClick?: VoidFunction;
  icon?: IconType;
  href?: string | UrlObject;
  label: string;
};

function NavigationButton({ className, onClick, icon, href, label }: Props) {
  const Icon = icon || RxLinkNone1;

  return (
    <Link href={href || "#"}>
      <a onClick={onClick} className="block">
        <div
          className={classNames(
            "transform cursor-pointer rounded-xl bg-red-400 py-2 transition duration-300 ease-in-out hover:scale-110",
            "flex items-center justify-center gap-2 px-6",
            className
          )}
        >
          {Icon && <Icon width={16} height={16} color="white" />}

          <span className="text-white">{label}</span>
        </div>
      </a>
    </Link>
  );
}

export default NavigationButton;
