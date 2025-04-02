import React, { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa6";
import { BsArrowRight } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Breadcrumb from "../../Breadcrumb";
import Navbar from "../../Navbar";
import CarImage from "./CarImage";
import CarTabContent from "./CarTabContent";
import CarTabNavigation from "./CarTabNavigation";
import SelectSlot from "./SelectSlot";

const DrivingDetails = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [isSelectSlotOpen, setIsSelectSlotOpen] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const location = useLocation();
  const { car } = location.state;

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const checkWishlist = async () => {
      if (userId) {
        try {
          const response = await fetch(
            `https://driving.shellcode.cloud/api/wishlist/${userId}`
          );
          const wishlistData = await response.json();
          const isCarInWishlist = wishlistData.wishlist.some(
            (item) => item.id === car.id
          );
          setIsInWishlist(isCarInWishlist);
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      }
    };

    checkWishlist();
  }, [userId, car.id]);

  const addOrRemoveFromWishlist = async () => {
    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    const body = { user_id: userId, practise_driving_id: car.id };
    const loadingToast = toast.loading(
      isInWishlist ? "Removing from wishlist..." : "Adding to wishlist..."
    );

    try {
      const response = await fetch(
        `https://driving.shellcode.cloud/api/${
          isInWishlist ? "remove-course-from-wishlist" : "wishlist"
        }`,
        {
          method: isInWishlist ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        const successMessage = isInWishlist
          ? "Car removed from wishlist"
          : "Car added to wishlist";
        toast.success(successMessage, { id: loadingToast });
        setIsInWishlist(!isInWishlist);
      } else {
        toast.error("Failed to update wishlist", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("An error occurred while updating the wishlist", {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="bg-[#F3F4F6] pb-20">
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-10">
        <Breadcrumb />
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {/* Car Image */}
          <div>
            <CarImage car={car} image={car.images} />
          </div>
          {/* Car Details */}
          <div className="pt-4 space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{car.name}</h3>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <p className="text-sm">{car.rating}</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm">{car.brand}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">
                <span className="font-bold text-lg text-black">
                  {car?.price?.replace("$", "₹")}
                </span>
                /hour
              </p>
              <FaHeart
                className={`text-2xl cursor-pointer ${
                  isInWishlist ? "text-red-500" : "text-gray-500"
                }`}
                onClick={addOrRemoveFromWishlist}
              />
            </div>
            <button
              className="w-full md:w-3/12 bg-black text-white rounded-lg py-3 flex items-center justify-center gap-2"
              onClick={() => setIsSelectSlotOpen(true)}>
              Select Slot
              <BsArrowRight className="text-lg" />
            </button>
          </div>
        </div>
        <CarTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <CarTabContent activeTab={activeTab} car={car} />
      </div>
      {isSelectSlotOpen && (
        <SelectSlot handleClose={setIsSelectSlotOpen} car={car} />
      )}
      <Toaster />
    </div>
  );
};

export default DrivingDetails;
