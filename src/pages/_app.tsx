import "../styles/globals.css";
import type { AppType } from "next/app";
import { DefaultLayout } from "../components/common/Layout";
import React from "react";
import Head from "next/head";

const MyApp: AppType<{
  layout: React.FC;
  title: string;
}> = ({
  Component,
  pageProps: { layout = DefaultLayout, title = "Default Page", ...pageProps },
}) => {
  const Layout = layout;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
