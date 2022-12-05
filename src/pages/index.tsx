import Home from "../components/home/Home";
import {} from "@reduxjs/toolkit";
import client from "../core/client";

const HomePage = () => {
  // const {}
  return (
    <>
      <button
        onClick={() => {
          // mock api
          client.get("/api/customer/me").then((res) => {
            console.log(res);
          });
        }}
      >
        click
      </button>
      <Home />
    </>
  );
};

HomePage.title = "Home";

export default HomePage;
