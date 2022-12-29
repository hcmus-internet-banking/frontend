import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultLayout } from "../components/common/Layout";
import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { rootStore } from "../store/store";
import { Toaster } from "react-hot-toast";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import StoreHandlingProvider from "../store/storeErrorHandler";
import { queryClient } from "../core/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { socket } from "@/core/socketClient";

const persistor = persistStore(rootStore);

interface AppPropsWithLayout extends AppProps {
  Component: AppProps["Component"] & {
    layout?: React.ComponentType;
    title?: string;
  };
}

socket.on("connect", () => {
  console.log("connected with socket id: ", socket.id);
  if (typeof window !== "undefined") {
    localStorage.setItem("socketId", socket.id);
  }
});

const MyApp = ({
  Component,
  pageProps: { ...pageProps },
}: AppPropsWithLayout) => {
  const Layout = Component.layout || DefaultLayout;
  const title = Component.title || "Default Page";

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={rootStore}>
        <PersistGate loading={null} persistor={persistor}>
          <StoreHandlingProvider>
            <>
              <Head>
                <title>{title}</title>
                <link rel="icon" href="/logo.png" />
              </Head>
              <Layout>
                <Component {...pageProps} socket={socket} />
              </Layout>
              <Toaster />
              {process.env.NODE_ENV !== "production" && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
            </>
          </StoreHandlingProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default MyApp;
