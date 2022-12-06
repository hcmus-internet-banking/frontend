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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StoreHandlingProvider from "../store/storeErrorHandler";

export const queryClient = new QueryClient();
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
              </Head>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <Toaster />
            </>
          </StoreHandlingProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default MyApp;
