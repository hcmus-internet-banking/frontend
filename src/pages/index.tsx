import Home from "@/components/home/Home";
import { useEffect } from "react";

const HomePage = ({ socket }: any) => {
  // socket.emit("test", "hello world");
  useEffect(() => {
    socket.emit("test", "hello world");
  }, [socket]);
  return <Home />;
};

HomePage.title = "Home";

export default HomePage;
