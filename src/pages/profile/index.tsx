import { selectAuth } from "../../store/auth";
import { useAppSelector } from "../../store/store";

function Index() {
  const { user } = useAppSelector(selectAuth);

  return (
    <div>
      <div className="h-40 w-96 rounded bg-gradient-to-r from-green-300 to-lime-300 p-2">
        <div className="text-xl">Total</div>

        <div>{user?.accountNumber}</div>
      </div>
    </div>
  );
}

export default Index;
