import Balance from "./Balance";
import { Debts } from "./Debts";
import { Settings } from "./Settings";
import { Transfer } from "./transfer/Transfer";

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
