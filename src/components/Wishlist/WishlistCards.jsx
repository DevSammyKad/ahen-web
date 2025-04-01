import React, { useEffect, useState } from "react";
import cardImage1 from "../../assets/images/homeCardImage.png";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast"; // Import react-hot-toast for notifications

const WishlistCards = () => {
  const [data, setData] = useState([]);

  // Get userId from localStorage
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchWishlistData = async () => {
      if (userId) {
        try {
          const response = await fetch(
            `https://driving.shellcode.cloud/api/wishlist/${userId}`
          );
          const wishlistData = await response.json();
          setData(wishlistData.wishlist);
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      }
    };

    fetchWishlistData();
  }, [userId]); // Effect runs when userId changes

  const removeFromWishlist = async (wishlistItem) => {
    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    const isCourse = wishlistItem.course !== null;
    const apiEndpoint = isCourse
      ? "https://driving.shellcode.cloud/api/wishlist/remove-course-from-wishlist"
      : "https://driving.shellcode.cloud/api/wishlist/remove-practise-driving";

    const body = {
      user_id: userId,

      wishlist_id: wishlistItem.wishlist_id,
      [isCourse ? "course_id" : "practise_driving_id"]: isCourse
        ? wishlistItem.course.id
        : wishlistItem.practise_driving.id,
    };

    // Show loading toast
    const loadingToast = toast.loading(
      `Removing ${isCourse ? "course" : "practice driving"} from wishlist...`
    );

    try {
      const response = await fetch(apiEndpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success(
          `${isCourse ? "Course" : "Practice driving"} removed from wishlist`,
          { id: loadingToast }
        );

        // Update state to remove the item from UI
        setData((prevData) =>
          prevData.filter(
            (item) => item.wishlist_id !== wishlistItem.wishlist_id
          )
        );
      } else {
        toast.error(
          `Failed to remove ${
            isCourse ? "course" : "practice driving"
          } from wishlist`,
          { id: loadingToast }
        );
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("An error occurred while removing from wishlist", {
        id: loadingToast,
      });
    }
  };

  return (
    <div>
      {data && data.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        data.map((info, index) => (
          <div key={index} className="bg-[#F3F4F6] md:p-4 p-2 mb-7 rounded-lg">
            <div className="bg-white rounded-lg relative">
              <img
                alt={info.course?.title || info.practise_driving?.carname}
                src={
                  info.course?.image ||
                  info.practise_driving?.image ||
                  cardImage1
                }
                className="w-full rounded-lg"
              />
              <FaHeart
                className="absolute right-2 top-2 cursor-pointer text-red-500"
                onClick={() => removeFromWishlist(info)} // Call remove function
              />
            </div>
            <p className="mt-2 text-sm font-medium">
              {info.course?.title || info.practise_driving?.carname}
            </p>
            <div className="flex items-center gap-4">
              <p className="font-bold">
                ₹
                {info.course
                  ? info.course.price -
                    (info.course.price * info.course.discount) / 100
                  : info.practise_driving?.price || "N/A"}
              </p>
              {info.course && (
                <p className="text-xs text-[#61C36D] font-semibold">
                  {info.course.discount}% off
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WishlistCards;
