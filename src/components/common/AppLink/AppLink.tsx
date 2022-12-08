import classNames from "classnames";
import Link from "next/link";
import { IconType } from "react-icons";

type Props = {
  href?: string;
  onClick?: () => void;
  text: string;
  iconLeft?: IconType;
  newTab?: boolean;
  textClassName?: string;
  iconClassName?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function AppLink({
  href,
  text,
  iconLeft,
  onClick,
  newTab,
  textClassName,
  iconClassName,
  ...props
}: Props) {
  const IconLeft = iconLeft;
  return (
    <Link href={href || "#"}>
      <a
        className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-opacity-70"
        target={newTab ? "_blank" : undefined}
        onClick={onClick}
        {...props}
      >
        {IconLeft && (
          <IconLeft className={classNames("inline-block", iconClassName)} />
        )}
        <span className={textClassName}>{text}</span>
      </a>
    </Link>
  );
}

export default AppLink;
