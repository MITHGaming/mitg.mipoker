import env from '@/environment';
import { useEffect, useState } from 'react';
import { Socket, Manager } from 'socket.io-client';

export const useSocket = (namespace: string, options: any = {}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const managerSocket = new Manager(`${env.SOCKET.URL}`, {
      transports: [`websocket`],
    });

    const newSocket = managerSocket.socket(`/${namespace}`, {
      ...options,
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return socket;
};
