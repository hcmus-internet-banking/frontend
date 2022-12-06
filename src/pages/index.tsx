import Home from "../components/home/Home";
import client from "../core/client";
import toast from "react-hot-toast";
import Button from "../components/common/Button/Button";

const HomePage = () => {
  // const {}
  return (
    <>
      <Button
        onClick={() => {
          toast.promise(client.get("/api/customer/my"), {
            loading: "Loading",
            success: (res) => {
              return JSON.stringify(res.data);
            },
            error: (err) => {
              return JSON.stringify(err);
            },
          });
        }}
      >
        click
      </Button>
      <Home />
    </>
  );
};

HomePage.title = "Home";

export default HomePage;
