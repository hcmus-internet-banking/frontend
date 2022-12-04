import "../styles/globals.css";
import type { AppType } from "next/app";
import { DefaultLayout } from "../components/common/Layout";
import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { rootStore } from "../store/store";
import { injectStore } from "../core/client";

injectStore(rootStore);

const MyApp: AppType<{
  layout: React.FC;
  title: string;
}> = ({
  Component,
  pageProps: { layout = DefaultLayout, title = "Default Page", ...pageProps },
}) => {
  const Layout = layout;

  return (
    <Provider store={rootStore}>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
