import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type routeURL = {
  url: string;
};

const initialState: routeURL = {
  url: '',
};

export const routeUrlSlice = createSlice({
  name: 'routeUrl',
  initialState,
  reducers: {
    setRouteUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const { setRouteUrl } = routeUrlSlice.actions;

export default routeUrlSlice.reducer;
