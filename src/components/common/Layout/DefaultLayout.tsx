import React from "react";
import NavigationButton from "./components/NavigationButton";
import { IoHome, IoLogIn, IoPerson, IoReceipt } from "react-icons/io5";
import AppLink from "../AppLink/AppLink";
import { SiSwagger } from "react-icons/si";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  logoutAsync,
  selectIsAuthenticated,
  selectUser,
} from "../../../store/auth";
import Spacer from "../Spacer/Spacer";
import Auth from "../Auth/Auth";

type Props = { children: React.ReactElement };

function Layout({ children }: Props) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <Auth>
      <div>
        <nav className="sticky top-0 w-full max-w-full overflow-x-auto bg-gray-100 py-4 px-10">
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
            <NavigationButton
              className="bg-lime-600"
              href="/user/transfers"
              label="Transfers"
            />
            <NavigationButton
              className="bg-yellow-600"
              href="/user/debts"
              label="Debts"
            />
            <div className="flex-1"></div>
            {!isAuthenticated ? (
              <AppLink href="/login" text="Login" iconLeft={IoLogIn} />
            ) : (
              <>
                <NavigationButton
                  className="truncate bg-blue-400"
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

        <header className="flex max-w-full justify-center overflow-x-auto bg-gray-200">
          <Spacer className="border-b" />
          <AppLink href="/" text="Home" iconLeft={IoReceipt} />
          <AppLink
            href="https://elements.getpostman.com/redirect?entityId=22930192-6a16bef1-20f5-4726-9737-6966231a5464&entityType=collection"
            text="API Documentation"
            iconLeft={SiSwagger}
            target="_blank"
          />
          {/* TODO: Check for Admin */}
          {/* <AppLink href="/admin" text="Admin Panel" iconLeft={IoFingerPrint} /> */}
        </header>

        <main className="mx-auto max-w-5xl p-2">{children}</main>
      </div>
    </Auth>
  );
}

export default Layout;
