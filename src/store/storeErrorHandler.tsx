import React, { memo, useEffect } from "react";
import toast from "react-hot-toast";
import { clearError, selectAuthError } from "./auth";
import { store } from "./";
import { useAppSelector } from "./store";

function StoreHandlingProvider({ children }: { children: React.ReactElement }) {
  const authError = useAppSelector(selectAuthError);

  useEffect(() => {
    if (authError) {
      toast.error(authError);

      store.dispatch(clearError());
    }
  }, [authError]);

  return children;
}

export default memo(StoreHandlingProvider);
