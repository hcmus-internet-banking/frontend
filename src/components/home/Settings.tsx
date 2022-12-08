import Card from "../common/Card/Card";
import { MdSettings } from "react-icons/md";
import Link from "next/link";

export const Settings = () => {
  const actions = [{ url: "/settings/change-password", label: "Đổi mật khẩu" }];

  return (
    <Card className="bg-gradient-to-tr from-gray-400 to-gray-600 text-white">
      <div className=" text-xl font-light uppercase tracking-wide">
        Settings
      </div>

      <div className="mt-4 space-y-2">
        {actions.map((action) => (
          <div
            key={action.url}
            className="flex items-center gap-1 rounded py-1 px-2 text-sm transition hover:bg-gray-700"
          >
            <MdSettings />

            <Link href={action.url}>
              <a className="flex-1">{action.label}</a>
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
};
