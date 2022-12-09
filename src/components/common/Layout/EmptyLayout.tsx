import React from "react";

type Props = {
  children: React.ReactElement;
};

function Layout({ children }: Props) {
  return <main className="mx-auto max-w-5xl p-2">{children}</main>;
}

export default Layout;
