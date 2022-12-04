import Link from "next/link";
import { IconType } from "react-icons";

type Props = {
  href: string;
  text: string;
  iconLeft?: IconType;
  newTab?: boolean;
};

function AppLink({ href, text, iconLeft, newTab }: Props) {
  const IconLeft = iconLeft;
  return (
    <Link href={href}>
      <a
        className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-opacity-70"
        target={newTab ? "_blank" : undefined}
      >
        {IconLeft && <IconLeft className="inline-block" />}
        {text}
      </a>
    </Link>
  );
}

export default AppLink;
