import { Log } from "./Log";
import { Statistics } from "./Statistics";

function Home() {
  return (
    <div className="max-w-xl space-y-2 px-3 py-2">
      <Statistics />
      <Log />
    </div>
  );
}

export default Home;
