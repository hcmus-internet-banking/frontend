import React, { memo, useEffect } from "react";
import toast from "react-hot-toast";
import { clearError, selectAuthError } from "./auth";
import { store } from "./";
import { useAppSelector } from "./store";

function StoreHandlingProvider({ children }: { children: React.ReactElement }) {
  const authError = useAppSelector(selectAuthError);
  // const authLoading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    if (authError) {
      toast.error(authError);

      store.dispatch(clearError());
    }
  }, [authError]);

  return (
    <>
      {/* {authLoading && (
        <div
          className={classNames(
            "fixed inset-0 bg-black bg-opacity-80",
            "flex items-center justify-center",
            "z-50"
          )}
        >
          <Spinner height={40} width={20} color="white" />
        </div>
      )} */}
      {children}
    </>
  );
}

export default memo(StoreHandlingProvider);
