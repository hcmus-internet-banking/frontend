import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../core/utils/trpc";
import { DefaultLayout } from "../components/common/Layout";
import React from "react";
import Head from "next/head";

const MyApp: AppType<{
  session: Session | null;
  layout: React.FC;
  title: string;
}> = ({
  Component,
  pageProps: {
    session,
    layout = DefaultLayout,
    title = "Default Page",
    ...pageProps
  },
}) => {
  const Layout = layout;

  return (
    <SessionProvider session={session}>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
