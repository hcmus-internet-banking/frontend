import Home from "../components/home/Home";
import client from "../core/client";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/common/Spinner/Spinner";
import { handleResponse } from "../core/handleResponse";

const HomePage = () => {
  const { data, isLoading, error } = useQuery(["my"], async () => {
    const res = await client.get("/api/customer/my");

    return handleResponse(res);
  });

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
