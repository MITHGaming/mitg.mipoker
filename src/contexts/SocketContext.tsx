import { createContext } from 'react';
import socketIoClient from 'socket.io-client';
import env from '@/environment';

export const socket = socketIoClient(`${env.SOCKET.URL}`, {
  transports: [`websocket`],
});
export const SocketContext = createContext(socket);
