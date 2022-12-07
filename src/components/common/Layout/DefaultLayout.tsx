import React from "react";
import NavigationButton from "./components/NavigationButton";
import {
  IoFingerPrint,
  IoHome,
  IoLogIn,
  IoLogoFacebook,
  IoLogoTwitter,
  IoPerson,
  IoReceipt,
} from "react-icons/io5";
import { useRouter } from "next/router";
import AppLink from "../AppLink/AppLink";
import { SiSwagger } from "react-icons/si";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  logoutAsync,
  selectIsAuthenticated,
  selectUser,
} from "../../../store/auth";
import Spacer from "../Spacer/Spacer";

type Props = { children: React.ReactElement };

const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL as string;

function Layout({ children }: Props) {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

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
        {!isAuthenticated ? (
          <AppLink href="/login" text="Login" iconLeft={IoLogIn} />
        ) : (
          <>
            <AppLink
              href="/profile"
              text={`${user?.firstName} ${user?.lastName}`}
              iconLeft={IoPerson}
            />
            <AppLink
              href="/user/recipients"
              text="Recipients"
              iconLeft={IoReceipt}
            />
            <AppLink
              onClick={() => {
                dispatch(logoutAsync());
              }}
              text="Logout"
              iconLeft={IoLogIn}
            />
          </>
        )}

        <Spacer className="border-b" />

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

      <main className="h-[calc(100vh)] flex-1 overflow-y-auto p-2">
        {children}
      </main>
    </div>
  );
}

export default Layout;
