import { ManagerSocketContext } from '@/contexts/SocketContext';
import { setStatusSocket } from '@/store/slicers';
import { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { Socket } from 'socket.io-client';

export const useSocket = (namespace = `/`, options: any = {}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const managerSocket = useContext(ManagerSocketContext);
  const store = useStore();

  useEffect(() => {
    const socket = managerSocket.socket(namespace, {
      ...options,
    });

    socket.open();
    setSocket(socket);

    socket.on(`connect`, () => {
      store.dispatch(
        setStatusSocket({ id: socket.id, connected: true, namespace }),
      );
    });

    socket.on(`disconnect`, () => {
      store.dispatch(
        setStatusSocket({ id: ``, connected: false, namespace: `` }),
      );
    });

    return () => {
      socket.close();
    };
  }, []);

  return socket;
};
