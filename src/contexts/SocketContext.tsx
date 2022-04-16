import { createContext, FC } from 'react';
import socketIoClient from 'socket.io-client';
import env from '@/environment';
import { useStore } from 'react-redux';
import { setConnected } from '@/store/slicers';

export const socket = socketIoClient(`${env.SOCKET.URL}`, {
  transports: [`websocket`],
});
export const SocketContext = createContext(socket);

export const SocketProvider: FC = ({ children }) => {
  const store = useStore();

  socket.on(`connect`, () => {
    store.dispatch(setConnected({ id: socket.id, connected: true }));
  });

  socket.on(`disconnect`, () => {
    store.dispatch(setConnected({ id: ``, connected: false }));
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
