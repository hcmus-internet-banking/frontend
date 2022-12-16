import { Settings } from "./Settings";
import { Debts } from "./Debts";
import { Transfer } from "./transfer/Transfer";
import Balance from "./Balance";

const Home = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <Balance />
        <Transfer />
        <Debts />
        <Settings />
      </div>
    </div>
  );
};

export default Home;
