import React, { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa6";
import toast from "react-hot-toast";

const CourseInfo = ({ course }) => {
  const [isInWishlist, setIsInWishlist] = useState(false); // Track if course is in wishlist
  const userId = localStorage.getItem("user_id"); // Get userId from localStorage

  useEffect(() => {
    const checkWishlist = async () => {
      if (userId) {
        try {
          const response = await fetch(
            `https://driving.shellcode.cloud/api/wishlist/${userId}`
          );
          const wishlistData = await response.json();
          const isCourseInWishlist = wishlistData.wishlist.some(
            (item) => item.id === course.courseId
          );
          setIsInWishlist(isCourseInWishlist);
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      }
    };

    checkWishlist();
  }, [userId, course.courseId]);

  const addOrRemoveFromWishlist = async () => {
    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    const body = { user_id: userId, course_id: course.courseId };
    const loadingToast = toast.loading(
      isInWishlist ? "Removing from wishlist..." : "Adding to wishlist..."
    );

    try {
      const response = await fetch(
        `https://driving.shellcode.cloud/api/${
          isInWishlist ? "wishlist/remove-course-from-wishlist" : "wishlist"
        }`,
        {
          method: isInWishlist ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        toast.success(
          isInWishlist
            ? "Course removed from wishlist"
            : "Course added to wishlist",
          { id: loadingToast }
        );
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
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900">
          {course.title || course.courseTitle}
        </h2>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <FaStar className="text-yellow-500" />
            <span>{course?.starRating}</span>
            <span>({course?.reviews?.length} ratings)</span>
          </div>
          <FaHeart
            className={`text-xl cursor-pointer ${
              isInWishlist ? "text-red-500" : "text-gray-400"
            }`}
            onClick={addOrRemoveFromWishlist}
          />
        </div>
      </div>
      <div className="flex flex-col items-start gap-1">
        <p className="text-2xl font-semibold text-gray-800">{`₹${
          course.price - (course.price * course.discount) / 100
        }`}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm line-through text-gray-400">{`₹${course.price}`}</span>
          <span className="text-sm text-green-600 font-medium">
            {course.discount}% off
          </span>
        </div>
        <p className="text-xs text-gray-500">Inclusive of all taxes</p>
      </div>
      <p className="text-sm font-medium text-gray-600">
        {course.totalSession} Sessions
      </p>
    </div>
  );
};

export default CourseInfo;
