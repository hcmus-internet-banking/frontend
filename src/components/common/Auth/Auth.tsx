import { selectIsAuthenticated } from "@/store/auth";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import * as React from "react";

type Props = {
  children: React.ReactElement;
};

export default function Auth({ children }: Props) {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }
  return <>{children}</>;
}
