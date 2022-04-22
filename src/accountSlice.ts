import { createSlice } from "@reduxjs/toolkit";
import { User } from "./types/User"

interface IInitialState {
  token: string;
  login: boolean;
  user: User | null;
}

const initialState: IInitialState = {
  token: '',
  login: false,
  user: null,
}

export const accountSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.login = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = '';
      state.login = false;
      state.user = null;
    }
  },
});

export const { login, logout } = accountSlice.actions;
export default accountSlice.reducer;