import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuArrowLeft } from "react-icons/lu";
import { toggleOpenWishlist } from "../redux/slices/wishlistSlice";
import WishlistCards from "./Wishlist/WishlistCards";

const Wishlist = () => {
  const dispatch = useDispatch();
  const isWishlistOpen = useSelector((state) => state.wishlist.isWishlistOpen);

  const handleOpenWishlist = () => {
    dispatch(toggleOpenWishlist(false));
  };

  return (
    <div
      className={`fixed right-0 top-0 h-full z-50 w-72 md:w-96 px-5 bg-white shadow-lg transition-transform duration-500 ease-in-out transform ${
        isWishlistOpen
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      } rounded-lg`}>
      <div className="flex items-center w-full relative">
        <LuArrowLeft
          className="absolute left-0 text-xl cursor-pointer"
          onClick={handleOpenWishlist}
        />
        <h2 className="flex-1 text-center p-4 font-semibold text-lg">
          Wishlist
        </h2>
      </div>
      <div className="overflow-y-auto max-h-screen px-4 pb-16">
        <WishlistCards />
      </div>
    </div>
  );
};

export default Wishlist;
