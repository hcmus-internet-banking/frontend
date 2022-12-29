import React from "react";
import Modal from "../common/Modal/Modal";

type Props = {
  hide: boolean;
  toggle: () => void;
};

const NotifyManager = ({ hide, toggle }: Props) => {
  return <Modal title="Notify Manager" hide={hide} toggle={toggle}></Modal>;
};

export default NotifyManager;
