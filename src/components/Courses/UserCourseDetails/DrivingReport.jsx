import React from "react";
import { RxCross2 } from "react-icons/rx";
import drivingImage from "../../../assets/images/driving.png";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleOpenReport } from "../../../redux/slices/reportSlice";

const DrivingReport = () => {
  const dispatch = useDispatch();
  const isReportOpen = useSelector((state) => state.report.isReportOpen);

  const handleCloseReport = () => {
    dispatch(toggleOpenReport(false));
  };

  const drivingReportData = {
    title: "Rural Driving",
    instructor: {
      name: "Jackie Chan",
      photo: "https://placehold.co/50",
    },
    performance: {
      rating: 3, // Performance rating (1-5)
      feedback: "Slow but steady hold on brake",
    },
    comments:
      "Your control over the brakes is improving. Keep working on braking smoothly.",
  };

  const { title, instructor, performance, comments } = drivingReportData;

  return (
    <>
      {isReportOpen && (
        <div>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={handleCloseReport}></div>

          <div className="absolute z-50 w-[90%] sm:w-[500px] h-auto left-1/2 top-[70%] transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-lg">
            <div className="relative">
              <RxCross2
                className="absolute right-3 top-3 text-xl cursor-pointer"
                onClick={handleCloseReport}
              />
            </div>

            <div className="py-5 px-8 sm:px-16">
              <p className="text-center text-xl font-semibold">{title}</p>
              <div>
                <img
                  alt="driving"
                  src={drivingImage}
                  className="w-full mt-5 rounded-lg shadow-lg"
                />
              </div>
              <p className="text-sm mt-5 text-gray-600">Your Instructor</p>
              <div className="flex gap-2 items-center text-sm font-medium mt-2">
                <img
                  alt="instructor"
                  src={instructor.photo}
                  className="h-8 w-8 rounded-md"
                />
                <p>{instructor.name}</p>
              </div>
              <p className="text-sm mt-3 text-gray-600 border-t-2 pt-2">
                Your Performance
              </p>
              <div className="mt-2 w-full border-b-2 pb-3">
                <div className="flex justify-between gap-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className="flex flex-col items-center"
                      style={{ width: "20%" }}>
                      <FaStar
                        className={`text-3xl ${
                          star <= performance.rating
                            ? "text-black"
                            : "text-gray-300"
                        }`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between gap-4 text-sm text-gray-600 mt-1">
                  {["Bad", "Average", "Good", "Better", "Excellent"].map(
                    (label, index) => (
                      <div
                        key={index}
                        className="text-center"
                        style={{ width: "20%" }}>
                        {label}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mt-3">
                <p className="text-sm text-black">
                  How well you managed brakes?
                </p>
                <p className="text-sm text-gray-800 mt-1 border-b-2 pb-3">
                  {performance.feedback}
                </p>
              </div>
              <div className="mt-3">
                <p className="text-sm text-black">Additional Comments</p>
                <p className="text-sm text-gray-800 mt-1">{comments}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DrivingReport;
