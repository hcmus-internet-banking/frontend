import classNames from "classnames";
import React from "react";
import { IoClose } from "react-icons/io5";
import Heading from "../Heading/Heading";
import Spacer from "../Spacer/Spacer";

type Props = {
  children?: React.ReactNode;
  title: string;
  hide: boolean | undefined;
  toggle: any;
};

function Modal({ children, title, hide, toggle }: Props) {
  const hidden = hide ? "hidden" : undefined;

  return (
    <div
      className={classNames(
        "fixed top-0 left-0 z-10 w-full overflow-y-auto",
        hidden
      )}
    >
      <div className="min-height-100vh flex items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 animate-opacity-1 transition-opacity">
          <div
            className="absolute inset-0 bg-gray-900 opacity-75"
            onClick={toggle}
          />
        </div>
        <div
          className={classNames(
            "align-center inline-block transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle",
            "animate-from-bottom",
            "realtive"
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="w-full bg-white p-6">
            <div className="flex w-full justify-around">
              <Heading className="grow">{title}</Heading>
              <div
                className="p-2 text-xl font-bold hover:cursor-pointer hover:opacity-25"
                onClick={toggle}
              >
                <IoClose />
              </div>
            </div>
            <Spacer className="h-1" />
            <div className="grid grid-cols-1">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.Bottom = function Bottom({
  children,
  leftButtons,
}: {
  children?: React.ReactNode;
  leftButtons?: React.ReactNode;
}) {
  return (
    <div className="h-16">
      <div className="absolute inset-x-0 bottom-0 mt-6 flex w-full justify-between bg-gray-100 p-4">
        <div>{leftButtons}</div>
        <div className="flex justify-end space-x-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
