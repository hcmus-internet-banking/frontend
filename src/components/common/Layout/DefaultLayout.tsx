import React from "react";

type Props = { children: React.ReactElement };

function Layout({ children }: Props) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
