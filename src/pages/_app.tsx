import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { DefaultLayout } from "../components/common/Layout";
import { queryClient } from "../core/queryClient";
import { rootStore } from "../store/store";
import StoreHandlingProvider from "../store/storeErrorHandler";
import "../styles/globals.css";

const persistor = persistStore(rootStore);

interface AppPropsWithLayout extends AppProps {
  Component: AppProps["Component"] & {
    layout?: React.ComponentType;
    title?: string;
  };
}

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
                <Component {...pageProps} />
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
