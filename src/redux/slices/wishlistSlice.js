import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    isWishlistOpen: false,
  },
  reducers: {
    toggleOpenWishlist: (state, action) => {
      return {
        ...state,
        isWishlistOpen: action.payload,
      };
    },
  },
});

export const { toggleOpenWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
