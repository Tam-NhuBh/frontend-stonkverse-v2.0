import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  token: string;
  user: string;
}

const initialState: AuthState = {
  token: "",
  user: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },

    userLogin: (
      state,
      action: PayloadAction<{ token: string; user: string }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },

    userLogout: (state) => {
      state.token = "";
      state.user = "";
    },
  },
});

export const { userRegistration, userLogin, userLogout } = authSlice.actions;

export default authSlice.reducer;
