import { getSession } from "next-auth/react";
import React from "react";

type Props = {};

function Index({}: Props) {
  return <div>Index</div>;
}

export default Index;

export const getServersideProps = async () => {
  if (!(await getSession())) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
