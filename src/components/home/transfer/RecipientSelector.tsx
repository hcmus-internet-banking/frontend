import Card from "@/components/common/Card/Card";
import Modal from "@/components/common/Modal/Modal";
import Spinner from "@/components/common/Spinner/Spinner";
import { useQueryRecipientList } from "@/lib/home/hooks/recipient/useQueryGetRecipients";
import { Recipient } from "@/store/recipients/types";
import { useEffect, useState } from "react";
import Input from "../../common/Input/Input";

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
  const { data: recipientList, isLoading } = useQueryRecipientList();

  const [selectedRecipient, setSelectedRecipient] = useState(
    recipientList?.data
  );

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSelectedRecipient(recipientList?.data);
  }, [recipientList]);

  const filterRecipient = (e: any) => {
    const { value } = e?.target;
    setSearchText(value);

    const isFilterByName = Number.isNaN(Number(value));

    if (value.length === 0)
      return setSelectedRecipient(recipientList?.data as any);

    const filteredRecipient = recipientList?.data?.filter(
      (recipient: Recipient) =>
        isFilterByName
          ? recipient.mnemonicName
              ?.toUpperCase()
              .includes(value.toUpperCase()) ||
            recipient.internalBankCustomer.firstName
              .toUpperCase()
              .includes(value.toUpperCase()) ||
            recipient.internalBankCustomer.lastName
              .toUpperCase()
              .includes(value.toUpperCase())
          : recipient.accountNumber.includes(value)
    );
    setSelectedRecipient(filteredRecipient);
  };

  return (
    <Modal title="Select recipient" hide={hide} toggle={toggle}>
      <Card className="max-w-lg bg-gray-100" noShadow>
        <Input
          className="w-full"
          name="search"
          placeholder="Search"
          onChange={filterRecipient}
          value={searchText}
        />
        <div className="py-4">
          {isLoading ? (
            <Spinner />
          ) : (
            <div
              className="overflow-y-scroll"
              style={{
                maxHeight: "50vh",
              }}
            >
              <table className="w-full table-auto overflow-scroll">
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
                      Mnemonic Name
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
                          setValues(recipient.accountNumber);
                          toggle();
                        }}
                      >
                        <td className=" whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          {recipient.mnemonicName ||
                            recipient.internalBankCustomer.firstName +
                              " " +
                              recipient.internalBankCustomer.lastName}
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
            </div>
          )}
        </div>
      </Card>
    </Modal>
  );
}

export default RecipientSelector;
