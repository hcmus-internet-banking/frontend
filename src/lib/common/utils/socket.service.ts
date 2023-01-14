import { io } from "socket.io-client";

let socket: any;

const initSocket = () => {
  socket = socket
    ? socket
    : io(
        (process.env.NEXT_PUBLIC_NOTIFY_SERVICE as string) ||
          "http://localhost:9000"
      );
};

export const Socket = () => {
  if (!socket) {
    initSocket();
  }

  return socket;
};
