import { io } from "socket.io-client";

let socket: any;

const initSocket = () => {
  socket = socket ? socket : io(process.env.NEXT_PUBLIC_SOCKET_URL as string);
};

export const Socket = () => {
  if (!socket) {
    initSocket();
  }

  return socket;
};
