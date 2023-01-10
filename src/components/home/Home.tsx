import { Settings } from "./Settings";
import { Debts } from "./Debts";
import { Transfer } from "./transfer/Transfer";
import Balance from "./Balance";

const Home = () => {
  return (
    <div>
      <div className="grid gap-2 md:grid-cols-2">
        <Balance />
        <Transfer />
        <Debts />
        <Settings />
      </div>
    </div>
  );
};

export default Home;

Home.title = "Home";
