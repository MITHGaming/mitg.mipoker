import { SocketContext } from '@/contexts/SocketContext';
import { useContext, useEffect, useState } from 'react';

export const useOnEvent = (eventName: string) => {
  const socket = useContext(SocketContext);
  const [res, setRes] = useState<any>(null);

  useEffect(() => {
    socket.on(eventName, (res: any) => {
      setRes(res);
    });

    return () => {
      socket.off(eventName);
    };
  }, []);

  return {
    res,
  };
};
