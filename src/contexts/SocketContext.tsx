import env from '@/environment';
import { createContext, FC, useEffect, useState } from 'react';
import { Manager } from 'socket.io-client';

const ManagerSocket: Manager = new Manager(`${env.SOCKET.URL}`, {
  transports: [`websocket`],
  autoConnect: false,
});
export const ManagerSocketContext = createContext<Manager>(ManagerSocket);

export const SocketProvider: FC = ({ children }) => {
  const [managerSocket, setManagerSocket] = useState<Manager>(ManagerSocket);

  useEffect(() => {
    setManagerSocket(ManagerSocket);
  }, []);

  return (
    <ManagerSocketContext.Provider value={managerSocket}>
      {children}
    </ManagerSocketContext.Provider>
  );
};

export default SocketProvider;
