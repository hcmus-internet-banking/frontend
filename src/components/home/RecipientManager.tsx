import { useQueryGetRecipients } from "@/src/lib/home/hooks/useQueryGetRecipients";
import { RxPencil2, RxCross1 } from "react-icons/rx";
import Card from "../common/Card/Card";
import Spinner from "../common/Spinner/Spinner";
import CreateRecipient from "./CreateRecipient";

const RecipientManager = () => {
  const { data, isLoading } = useQueryGetRecipients({ limit: 5, offset: 0 });

  return (
    <>
      <CreateRecipient />

      <div className="max-w-md">
        {isLoading ? (
          <Spinner />
        ) : (
          data?.data.data.map((recipient) => {
            return (
              <Card
                className="rounded-none bg-gray-200 transition hover:bg-gray-300"
                noShadow
                key={recipient.id}
              >
                <div className="flex items-center gap-1">
                  <span className="flex-grow">{`💡 ${recipient.mnemonicName}`}</span>

                  <div className="flex gap-2">
                    <RxPencil2 className="inline-block h-4 w-4" />
                    <RxCross1
                      className="inline-block h-4 w-4 text-red-400"
                      strokeWidth={0.8}
                    />
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </>
  );
};

export default RecipientManager;
