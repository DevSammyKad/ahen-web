import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    isUserLoginOpen: false,
  },
  reducers: {
    toggleOpenUserLogin: (state, action) => {
      return {
        ...state,
        isUserLoginOpen: action.payload,
      };
    },
  },
});

export const { toggleOpenUserLogin } = UserSlice.actions;

export default UserSlice.reducer;
