import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

export const useOnEvent = (socket: Socket | null, eventName: string) => {
  const [res, setRes] = useState<any>(null);

  useEffect(() => {
    socket?.on(eventName, (res: any) => {
      setRes(res);
    });

    return () => {
      socket?.off(eventName);
    };
  }, []);

  return {
    res,
  };
};
