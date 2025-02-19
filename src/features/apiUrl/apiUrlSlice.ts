import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ApiURL = {
  url: string;
};

const initialState: ApiURL = {
  url: "http://localhost:3005/api/",
};

export const apiUrlSlice = createSlice({
  name: "apiUrl",
  initialState,
  reducers: {
    setApiUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const { setApiUrl } = apiUrlSlice.actions;

export default apiUrlSlice.reducer;
