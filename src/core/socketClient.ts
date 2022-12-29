import { io, Socket } from "socket.io-client";

export interface ServerToClientEvents {
  connect: () => void;
  disconnect: () => void;
  connect_error: (error: any) => void;
  connect_timeout: (timeout: number) => void;
  error: (error: any) => void;
  reconnect: (attemptNumber: number) => void;
  reconnect_attempt: (attemptNumber: number) => void;
  reconnecting: (attemptNumber: number) => void;
  reconnect_error: (error: any) => void;
  reconnect_failed: () => void;
  ping: () => void;
  pong: (latency: number) => void;
  message: (message: string) => void;
}

export interface ClientToServerEvents {
  message: (message: string) => void;
  on: (event: string, listener: (...args: any[]) => void) => void;
  emit: (event: string, ...args: any[]) => void;
}

// create global socket instance
const socketInstance = global as unknown as {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
};

// create socket instance if it doesn't exist
export const socket =
  socketInstance.socket ||
  (socketInstance.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string));
