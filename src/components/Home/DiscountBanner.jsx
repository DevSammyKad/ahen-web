import React from "react";
import { RiDiscountPercentFill } from "react-icons/ri";

const DiscountBanner = () => {
  return (
    <div className="flex flex-col sm:flex-row py-4 px-4 sm:py-7 sm:px-8 bg-white rounded-lg gap-4 sm:gap-7 items-center">
      <RiDiscountPercentFill className="text-4xl sm:text-6xl text-black" />
      <p className="text-base sm:text-2xl text-center sm:text-left">
        Sign up now and get 10% off your first course!
      </p>
    </div>
  );
};

export default DiscountBanner;
