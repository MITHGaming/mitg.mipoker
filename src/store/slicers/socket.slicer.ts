import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '..';

interface Socket {
  id: string;
  connected: boolean;
  namespace: string;
}

const initialState: Socket = {
  id: ``,
  connected: false,
  namespace: ``,
};

export const socketSlicer = createSlice({
  name: `socket`,
  initialState,
  reducers: {
    setConnected: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: any) => {
      console.log(`hydrate`, action.payload);
      return {
        ...state,
        ...action.payload.socket,
      };
    },
  },
});

export const { setConnected } = socketSlicer.actions;
export const getId = () => (state: AppState) => state.socket.id;
export const getConnected = () => (state: AppState) => state.socket;

export default socketSlicer;
