import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    decodificado: {
      role: "",
      name: "",
      email: "",
      id: "",
    },
  },

  reducers: {
    login: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    logout: (state, action) => {
      return {
        token: "",
        decodificado: {
          name: "",
          email: "",
          id: "",
        },
      };
    },
  },
});

export const { login, logout, resetCount } = userSlice.actions;

export const getUserData = (state) => state.user;

export const amIAdmin = (state) =>
  state.user.decodificado.role.name === "admin";
export default userSlice.reducer;
