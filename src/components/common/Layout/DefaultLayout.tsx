import React from "react";
import NavigationButton from "./components/NavigationButton";
import {
  IoFingerPrint,
  IoHome,
  IoLogIn,
  IoLogoFacebook,
  IoLogoTwitter,
  IoPerson,
} from "react-icons/io5";
import { useRouter } from "next/router";
import AppLink from "../AppLink/AppLink";
import { SiSwagger } from "react-icons/si";

type Props = { children: React.ReactElement };

const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL as string;

function Layout({ children }: Props) {
  const router = useRouter();

  const navigateTo = (path: string) => () => {
    router.push(path);
  };

  return (
    <div className="flex h-[calc(100vh)] w-full bg-gray-50">
      <nav className="flex h-[calc(100vh)] w-20 flex-col items-center space-y-3 bg-gray-100 py-4">
        <NavigationButton
          onClick={navigateTo("/")}
          className="bg-red-400"
          icon={IoHome}
        />
        <NavigationButton
          className="bg-green-400"
          onClick={navigateTo("/twitter-checker")}
          icon={IoLogoTwitter}
        />
        <NavigationButton className="bg-yellow-400" />

        <div className="flex-1"></div>

        <NavigationButton className="bg-blue-400" icon={IoPerson} />
      </nav>

      <div className="w-48 bg-white py-4">
        <AppLink href="/login" text="Login" iconLeft={IoLogIn} />
        <AppLink
          href={FACEBOOK_URL}
          text="Facebook"
          iconLeft={IoLogoFacebook}
          newTab
        />
        <AppLink
          href="/swagger"
          text="API Documentation"
          iconLeft={SiSwagger}
        />
        <AppLink href="/admin" text="Admin Panel" iconLeft={IoFingerPrint} />
      </div>

      <main className="h-[calc(100vh)] overflow-y-auto flex-1 p-2">{children}</main>
    </div>
  );
}

export default Layout;
