import React, { useEffect, useState } from "react";
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
import NotifyButton from "@/components/notify/NotifyButton";
import NotifyManager from "@/components/notify/NotifyManager";
import useToggle from "@/lib/common/hooks/useToggle";
import { Socket } from "@/lib/common/utils/socket.service";
import { toastNotify } from "@/lib/common/utils/react-hot-toast";

type Props = { children: React.ReactElement };

const socket = Socket();

function Layout({ children }: Props) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { value: hide, toggle } = useToggle(true);
  const [alertMessage, setAlertMessage] = useState<any>(null);

  useEffect(() => {
    if (alertMessage) {
      toastNotify(alertMessage);
      // toast.custom((t) => (
      //   <div
      //     className={`${
      //       t.visible ? "animate-enter" : "animate-leave"
      //     } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
      //   >
      //     <div className="w-0 flex-1 p-4">
      //       <div className="flex items-start">
      //         <div className="flex-shrink-0 pt-0.5">
      //           <TfiClose className="h-6 w-6 text-red-400" />
      //         </div>
      //         <div className="ml-3 flex-1">
      //           <p className="text-sm font-medium text-gray-900">
      //             Emilia Gates
      //           </p>
      //           <p className="mt-1 text-sm text-gray-500">
      //             Sure! 8:30pm works great!
      //           </p>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="flex border-l border-gray-200">
      //       <button
      //         onClick={() => toast.dismiss(t.id)}
      //         className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      //       >
      //         Close
      //       </button>
      //     </div>
      //   </div>
      // ));
      setAlertMessage(null);
    }
  }, [alertMessage]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected with socket id: ", socket.id);
    });

    socket.emit("userID", user?.id);

    socket.on("message", (data: any) => {
      setAlertMessage(data);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              className="bg-yellow-600"
              href="/user/invoices"
              label="Invoices"
            />
            <NavigationButton
              className="bg-blue-600"
              href="/user/transactions"
              label="Transactions"
            />
            <div className="flex-1 "></div>
            {!isAuthenticated ? (
              <AppLink href="/login" text="Login" iconLeft={IoLogIn} />
            ) : (
              <>
                <NotifyButton handleOnClick={toggle} />
                <NavigationButton
                  className="truncate bg-blue-400"
                  icon={IoPerson}
                  label={`${user?.firstName} ${user?.lastName}`}
                  href="/profile"
                />
                <AppLink
                  className="px-4 py-2"
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
          <AppLink
            href="/"
            text="Home"
            iconLeft={IoReceipt}
            className="px-4 py-2"
          />
          <AppLink
            href="https://elements.getpostman.com/redirect?entityId=22930192-6a16bef1-20f5-4726-9737-6966231a5464&entityType=collection"
            text="API Documentation"
            iconLeft={SiSwagger}
            target="_blank"
            className="px-4 py-2"
          />
          {/* TODO: Check for Admin */}
          {/* <AppLink href="/admin" text="Admin Panel" iconLeft={IoFingerPrint} /> */}
        </header>
        <NotifyManager hide={hide} toggle={toggle} />

        <main className="mx-auto max-w-5xl p-2">{children}</main>
      </div>
    </Auth>
  );
}

export default Layout;
