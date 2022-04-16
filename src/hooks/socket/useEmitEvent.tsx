import { SocketContext } from '@/contexts/SocketContext';
import { httpSocketResponseData } from '@/typings/socket';
import { useContext, useEffect, useState } from 'react';

export const useEmitEvent = (eventName = `status:ok`, payload: any) => {
  const socket = useContext(SocketContext);
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

  return {
    response,
    error,
    sendEvent,
  };
};
