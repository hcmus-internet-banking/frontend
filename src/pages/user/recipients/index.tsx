import Button from "../../../components/common/Button/Button";
import AddRecepientModal from "../../../components/user/AddRecepientModal";
import Recipient from "../../../components/user/Recipient";
import useToggle from "../../../lib/common/hooks/useToggle";

// Thiết lập danh sách người nhận
// Thông tin gồm { số-tài-khoản, tên-gợi-nhớ }.
// Trong trường hợp người dùng không nhập tên-gợi-nhớ, hệ thống sử dụng tên-đăng-ký của tài khoản người nhận làm tên-gợi-nhớ
// Hệ thống hỗ trợ khách hàng quản lý danh sách người nhận này (loại bỏ, điều chỉnh thông tin, …)

const Index = () => {
  const recipient = {
    id: 195203733,
    mnemonicName: "Mie6996",
  };

  const { value, toggle } = useToggle(false);

  return (
    <>
      <AddRecepientModal hide={value} toggle={toggle} />
      <div className="text-3xl font-bold">Recipient List</div>
      <Button className="my-4" onClick={toggle}>
        + Add new recipient
      </Button>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
        <Recipient recipient={recipient} />
      </div>
    </>
  );
};

Index.title = "Recipients";

export default Index;
