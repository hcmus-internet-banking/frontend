import classNames from "classnames";
import Link from "next/link";
import { IconType } from "react-icons";

type Props = {
  href?: string;
  onClick?: () => void;
  text?: string;
  iconLeft?: IconType;
  newTab?: boolean;
  textClassName?: string;
  iconClassName?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function AppLink({
  href,
  text,
  iconLeft,
  children,
  onClick,
  newTab,
  textClassName,
  iconClassName,
  className,
  ...props
}: Props) {
  const IconLeft = iconLeft;
  return (
    <Link href={href || "#"}>
      <a
        className={classNames(
          "flex items-center gap-1 text-cyan-700 hover:text-opacity-70",
          className
        )}
        target={newTab ? "_blank" : undefined}
        onClick={onClick}
        {...props}
      >
        {IconLeft && (
          <IconLeft className={classNames("inline-block", iconClassName)} />
        )}
        <span className={textClassName}>
          {text}
          {children}
        </span>
      </a>
    </Link>
  );
}

export default AppLink;
