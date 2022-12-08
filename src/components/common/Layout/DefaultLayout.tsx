import React from "react";
import NavigationButton from "./components/NavigationButton";
import {
  IoFingerPrint,
  IoHome,
  IoLogIn,
  IoLogoFacebook,
  IoPerson,
  IoReceipt,
} from "react-icons/io5";
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
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <div>
      <nav className="sticky top-0 w-full bg-gray-100 py-4 px-10">
        <div className="mx-auto flex max-w-7xl items-center space-x-3">
          <NavigationButton
            href="/"
            className="bg-red-600"
            icon={IoHome}
            label="Home"
          />
          <NavigationButton
            className="bg-green-600"
            href="/user/recipients"
            label="Recipients"
          />
          <NavigationButton className="bg-yellow-600" label="Debts" />
          <div className="flex-1"></div>
          {!isAuthenticated ? (
            <AppLink href="/login" text="Login" iconLeft={IoLogIn} />
          ) : (
            <>
              <NavigationButton
                className="bg-blue-400"
                icon={IoPerson}
                label={`${user?.firstName} ${user?.lastName}`}
                href="/profile"
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
        </div>
      </nav>

      <header className="flex justify-center bg-gray-200">
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
        <AppLink
          href="/user/recipients"
          text="Recipients"
          iconLeft={IoReceipt}
        />
      </header>

      <main className="mx-auto max-w-5xl p-2">{children}</main>
    </div>
  );
}

export default Layout;
