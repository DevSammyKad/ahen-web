import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toggleOpenRateInstructor } from "../redux/slices/sessionSlice";
import { FaStar } from "react-icons/fa6";

const RateInstructor = () => {
  const dispatch = useDispatch();
  const isRateInstructorOpen = useSelector(
    (state) => state.session.isRateInstructorOpen
  );

  const [rating, setRating] = useState(0); // State to track selected rating

  const handleCloseRating = () => {
    dispatch(toggleOpenRateInstructor(false));
  };

  const handleStarClick = (star) => {
    setRating(star); // Update the rating state
  };

  return (
    <>
      {isRateInstructorOpen && (
        <div>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={handleCloseRating}></div>

          <div className="absolute z-50 w-[500px] h-auto left-1/2 top-[25%] transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-lg">
            <div className="relative">
              <RxCross2
                className="absolute right-3 top-3 text-xl cursor-pointer"
                onClick={handleCloseRating}
              />
            </div>

            <div className="py-5 px-16 flex flex-col gap-4 items-center justify-center">
              <p className="text-lg font-semibold">Rate Instructor</p>
              <div className="flex flex-col items-center gap-3 cursor-pointer">
                <img
                  alt="instructor"
                  src={"https://placehold.co/400"}
                  className="h-14 w-14 rounded-md"
                />
                <div className="text-sm text-center">
                  <p className="font-semibold">Jackie Chan</p>
                  <p className="text-xs text-gray-500">Instructor</p>
                </div>
                <div className="mt-2 w-full pb-3">
                  <p className="text-xs text-center mb-2 text-gray-600">
                    Please rate your experience
                  </p>
                  <div className="flex justify-between gap-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => handleStarClick(star)}
                        style={{ width: "20%" }}>
                        <FaStar
                          className={`text-3xl ${
                            star <= rating ? "text-black" : "text-gray-300"
                          }`}
                        />
                        <p className="mt-1 text-sm text-gray-600">
                          {
                            ["Bad", "Average", "Good", "Better", "Excellent"][
                              star - 1
                            ]
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full">
                <p className="text-center text-sm font-semibold">
                  Additional Comment
                </p>
                <textarea
                  className="w-full mt-2 rounded-lg border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                  rows={4}
                  placeholder="Write your feedback here..."></textarea>
              </div>
              <button className="bg-black px-4 py-2 mt-4 text-white rounded-md hover:bg-gray-800">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RateInstructor;
