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
    mnemonicName: "Phát đẹp trai",
  };

  const { value, toggle } = useToggle(false);

  return (
    <>
      <AddRecepientModal hide={value} toggle={toggle} />
      <div className="text-3xl font-bold">Recipient List</div>
      <button
        className="my-4 h-10 rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition-[transform,box-shadow] hover:-translate-y-0.5 hover:bg-opacity-80 hover:shadow-lg hover:shadow-blue-600"
        onClick={toggle}
      >
        + Add new recipient
      </button>
      <div className="flex flex-col gap-3">
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

export default Index;
