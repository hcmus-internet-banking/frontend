import classNames from "classnames";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
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
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle">
          &#8203;
        </span>
        <div
          className="align-center inline-block transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="w-full bg-white p-6">
            <div className="flex w-full justify-around">
              <Heading className="grow font-bold">{title}</Heading>
              <div
                className="p-2 text-xl font-bold hover:cursor-pointer hover:opacity-25"
                onClick={toggle}
              >
                <AiOutlineClose />
              </div>
            </div>
            <Spacer className="h-1" />
            <div className="grid grid-cols-1 divide-x">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
