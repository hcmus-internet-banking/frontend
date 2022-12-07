import useToggle from "@/src/lib/common/hooks/useToggle";
import { useQueryGetRecipients } from "@/src/lib/home/hooks/useQueryGetRecipients";
import Button from "../common/Button/Button";
import Heading from "../common/Heading/Heading";
import Spinner from "../common/Spinner/Spinner";
import CreateRecipient from "./CreateRecipient";
import Recipient from "./Recipient";

const RecipientManager = () => {
  const { data, isLoading } = useQueryGetRecipients({ limit: 5, offset: 0 });
  const { value, toggle } = useToggle(true);

  return (
    <>
      <CreateRecipient hide={value} toggle={toggle} />
      <Heading size="sm">Recipient List</Heading>
      <Button className="my-4" onClick={toggle}>
        + Add new recipient
      </Button>

      {isLoading ? (
        <div className="max-w-md">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {data?.data.data.map((recipient) => {
              return <Recipient key={recipient.id} recipient={recipient} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default RecipientManager;
