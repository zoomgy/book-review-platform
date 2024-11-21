import { createSlice } from "@reduxjs/toolkit";
const persistedUser = JSON.parse(localStorage.getItem("user")) || {
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: persistedUser,
  reducers: {
    login: (state, action) => {
      const { id, name, email, isAdmin } = action.payload;
      state.name = name;
      state.email = email;
      state.id = id;
      state.isAdmin = isAdmin;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(state));
    },
    logout: (state) => {
      state.name = null;
      state.email = null;
      state.isAuthenticated = false;
      state.isAdmin = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
