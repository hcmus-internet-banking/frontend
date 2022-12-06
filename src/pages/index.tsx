import Spinner from "../components/common/Spinner/Spinner";
import { useQueryGetMyProfile } from "../lib/home/hooks/useQueryGetMyCustomer";
import Card from "../components/common/Card/Card";
import classNames from "classnames";
import Button from "../components/common/Button/Button";
import { toastNotify } from "../lib/common/utils/react-hot-toast";
import RecipientManager from "../components/home/RecipientManager";

const HomePage = () => {
  const { data, isLoading } = useQueryGetMyProfile();

  return (
    <div className="space-y-2">
      {isLoading && <Spinner />}
      {data && (
        <Card
          className={classNames(
            "h-40 max-w-md bg-gradient-to-tr from-gray-500 to-gray-800 text-gray-300",
            "flex flex-col"
          )}
        >
          <div className="text-center text-3xl tracking-[0.5rem] ">
            {data?.data.accountNumber}
          </div>

          <div className="flex-1" />

          <div className="flex items-center justify-between">
            <div className="text-2xl font-light uppercase tracking-wide ">
              <div className="text-3xl text-gray-200 transition hover:text-white">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(JSON.parse(JSON.stringify(data?.data?.balance || 0)))}
              </div>

              <div className="">
                {`${data?.data.firstName} ${data?.data.lastName}`}
              </div>
            </div>

            <div className="">
              <Button
                className="px-4 uppercase"
                size="sm"
                onClick={() => {
                  toastNotify(
                    "Currently, you can deposit by interacting with our employees."
                  );
                }}
              >
                deposit
              </Button>
            </div>
          </div>
        </Card>
      )}

      <RecipientManager />
    </div>
  );
};

HomePage.title = "Home";

export default HomePage;
