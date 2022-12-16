import Card from "@/components/common/Card/Card";
import Modal from "@/components/common/Modal/Modal";
import Spinner from "@/components/common/Spinner/Spinner";
import { useState } from "react";
import Input from "../../common/Input/Input";
import { useQueryRecipientList } from "@/lib/home/hooks/recipient/useQueryGetRecipients";

type RecipientSelectorProps = {
  hide: boolean;
  toggle: () => void;
  setValues: (values: string) => void;
};

function RecipientSelector({
  hide,
  toggle,
  setValues,
}: RecipientSelectorProps) {
  const { data: recipientList, isLoading, isSuccess } = useQueryRecipientList();
  const [selectedRecipient, setSelectedRecipient] = useState(
    recipientList?.data
  );
  const [searchText, setSearchText] = useState("");

  if (isSuccess && !selectedRecipient)
    setSelectedRecipient(recipientList?.data);

  const filterRecipient = (e: any) => {
    const { value } = e?.target;
    setSearchText(value);

    const isFilterByName = Number.isNaN(Number(value));

    if (value.length === 0)
      return setSelectedRecipient(recipientList?.data as any);
    const filteredRecipient = recipientList?.data?.filter((recipient: any) =>
      isFilterByName
        ? // recipient?.firstName.includes(value) ||
          // recipient.lastName.includes(value) ||
          recipient.mnemonicName.includes(value)
        : recipient.accountNumber.includes(value)
    );
    setSelectedRecipient(filteredRecipient as any);
  };

  return (
    <Modal title="Chọn người nhận" hide={hide} toggle={toggle}>
      <Card className="max-w-lg bg-gray-100" noShadow>
        <Input
          className="w-full"
          name="search"
          placeholder="Tìm kiếm"
          onChange={filterRecipient}
          value={searchText}
        />
        <div className="py-4">
          {isLoading ? (
            <Spinner />
          ) : (
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                  >
                    mnemonicName
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                  >
                    Account Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedRecipient ? (
                  selectedRecipient.map((recipient: any, index) => (
                    <tr
                      key={recipient.id}
                      className="cursor-pointer border-b  hover:bg-red-300"
                      onClick={() => {
                        setSelectedRecipient([recipient]);
                        // setSearchText(recipient.mnemonicName);
                        toggle();
                        setValues(recipient.accountNumber);
                      }}
                    >
                      <td className=" whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {recipient.mnemonicName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {recipient.accountNumber}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2}>Không có dữ liệu</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </Modal>
  );
}

export default RecipientSelector;
