import { httpSocketResponseData } from '@/typings/socket';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

export const useEmitEvent = (
  socket: Socket | null,
  eventName = `status:ok`,
  payload: any,
) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const sendEvent = () => {
    socket?.emit(eventName, payload, (res: httpSocketResponseData) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        setResponse(res.body);
      } else {
        setError(res.body);
      }
    });
  };

  useEffect(() => {
    return () => {
      socket?.off(eventName);
    };
  }, []);

  return {
    response,
    error,
    sendEvent,
  };
};
