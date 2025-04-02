import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toggleOpenRateInstructor } from "../redux/slices/sessionSlice";
import { FaStar } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RateInstructor = ({ upcomingSession }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRateInstructorOpen = useSelector(
    (state) => state.session.isRateInstructorOpen
  );
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [trainer, setTrainer] = useState({ name: "", profile_pic: "", id: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTrainerDetails = async () => {
      const userid = localStorage.getItem("user_id");
      try {
        const response = await axios.get(
          `https://driving.shellcode.cloud/trainer/api/bookings/trainer/getTrainerDetails/${userid}`,
        );
        if (response.data.trainerDetails?.length > 0) {
          setTrainer(response.data.trainerDetails[0]);
        }
      } catch (error) {
        console.error("Error fetching trainer details:", error);
      }
    };

    if (isRateInstructorOpen) {
      fetchTrainerDetails();
    }
  }, [isRateInstructorOpen]);

  const handleCloseRating = () => {
    dispatch(toggleOpenRateInstructor(false));
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const getRatingText = () => {
    const ratings = ["Bad", "Average", "Good", "Better", "Excellent"];
    return ratings[rating - 1] || "";
  };

  const handleSubmitRating = async () => {
    if (rating === 0) {
      alert("Please select a rating before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("instructor_name", trainer.name);
      formData.append("experience", getRatingText());
      formData.append("comment", comment);
      formData.append("user_id", localStorage.getItem("user_id"));
      formData.append("trainer_id", trainer.id);
      
      // Add session_id and course_id from upcomingSession prop
      if (upcomingSession) {
        formData.append("session_id", upcomingSession.id);
        formData.append("course_id", upcomingSession.course_id);
      }

      console.log("Form Data:",formData);

      const response = await axios.post(
        "https://driving.shellcode.cloud/api/rate-instructor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        alert("Rating submitted successfully!");
        handleCloseRating();
        navigate("/");
      } else {
        alert("Failed to submit rating. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("An error occurred while submitting your rating.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isRateInstructorOpen && (
        <div>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={handleCloseRating}
          ></div>

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
                  src={trainer.profile_pic || "https://placehold.co/400"}
                  className="h-14 w-14 rounded-md"
                />
                <div className="text-sm text-center">
                  <p className="font-semibold">{trainer.name || "Instructor"}</p>
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
                        style={{ width: "20%" }}
                      >
                        <FaStar
                          className={`text-3xl ${
                            star <= rating ? "text-black" : "text-gray-300"
                          }`}
                        />
                        <p className="mt-1 text-sm text-gray-600">
                          {["Bad", "Average", "Good", "Better", "Excellent"][
                            star - 1
                          ]}
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
                  placeholder="Write your feedback here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <button 
                onClick={handleSubmitRating} 
                className="bg-black px-4 py-2 mt-4 text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RateInstructor;