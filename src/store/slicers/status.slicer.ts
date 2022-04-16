import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '..';

interface Status {
  isLoading: boolean;
}

const initialState: Status = {
  isLoading: false,
};

export const statusSlice = createSlice({
  name: `status`,
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: any) => {
      console.log(`hydrate`, action.payload);
      return {
        ...state,
        ...action.payload.status,
      };
    },
  },
});

export const { setLoading } = statusSlice.actions;
export const selectIsLoading = () => (state: AppState) =>
  state.status.isLoading;

export default statusSlice;
