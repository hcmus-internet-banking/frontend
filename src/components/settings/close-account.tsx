import client from "@/core/client";
import { logout } from "@/store/auth";
import { useAppDispatch } from "@/store/store";
import React from "react";
import toast from "react-hot-toast";
import Button from "../common/Button/Button";
import Card from "../common/Card/Card";
import Heading from "../common/Heading/Heading";
import Modal from "../common/Modal/Modal";

function CloseAccount() {
  const [hide, setHide] = React.useState(true);

  const dispatch = useAppDispatch();

  return (
    <div>
      <Card>
        <Heading>Đóng tài khoản</Heading>

        <p>
          <strong>Chú ý:</strong> Tất cả dữ liệu của bạn sẽ bị xóa khỏi hệ
          thống.
        </p>

        <Button preset="error" onClick={() => setHide((state) => !state)}>
          Đóng tài khoản
        </Button>
      </Card>

      <Modal
        hide={hide}
        title="Đóng tài khoản"
        toggle={() => setHide((state) => !state)}
      >
        <Heading>Đóng tài khoản</Heading>

        <p>
          Bạn có chắc chắn muốn đóng tài khoản? Tất cả dữ liệu của bạn sẽ bị xóa
          khỏi hệ thống.
        </p>

        <div className="flex justify-end gap-2">
          <Button preset="filled" onClick={() => setHide((state) => !state)}>
            Hủy
          </Button>
          <Button
            onClick={() => {
              toast.promise(client.post("/api/auth/close-account"), {
                loading: "Đang đóng tài khoản...",
                success: (data: any) => {
                  setHide((state) => !state);
                  dispatch(logout());
                  return "Đã đóng tài khoản";
                },
                error: (err: any) => err.response?.data?.message || err.message,
              });
            }}
            preset="error"
          >
            Đóng tài khoản
          </Button>
        </div>
      </Modal>
    </div>
  );
}

CloseAccount.title = "Đóng tài khoản";

export default CloseAccount;
