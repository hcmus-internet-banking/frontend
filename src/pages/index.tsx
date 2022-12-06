import Home from "../components/home/Home";
import Spinner from "../components/common/Spinner/Spinner";
import { useGetMyData } from "../lib/home/hooks/useGetMyData";

const HomePage = () => {
  const { data, isLoading, error } = useGetMyData();

  return (
    <>
      {isLoading && <Spinner />}
      {error && <div>error: {JSON.stringify(error)}</div>}
      {data && <div>data: {JSON.stringify(data)}</div>}

      <Home />
    </>
  );
};

HomePage.title = "Home";

export default HomePage;
