import React from "react";
import DrivingLicense from "../Images/DrivingLicense_Man.svg";

function DrivingLicenseSection({ data }) {
  return (
    <div className="rounded-lg bg-[#fff] p-6">
      <h2 className="text-xl progress-heading mb-6">2. Driving License</h2>
      <div className="space-y-6">
        {/* Slot Booking and Test */}
        {data.slot_datetime && (
          <div className="flex items-center space-x-3">
            <p className="font-semibold progress-text text-sm md:text-base">
              Slot Booked: {new Date(data.slot_datetime).toLocaleString()}
            </p>
          </div>
        )}
        <div>
          <button className="bg-black mx-8 text-white px-5 py-2 rounded-xl shadow-md hover:bg-gray-800">
            Book Slot
          </button>
        </div>
        {/* Test Status */}
        {data.test_attempts && (
          <div className="space-y-2">
            {data.test_attempts.map((attempt, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className={`h-5 w-5 ${
                    attempt.status === "test_passed"
                      ? "bg-green-500"
                      : "bg-red-500"
                  } rounded-full flex items-center justify-center relative`}>
                  <span className="text-white">
                    <i className="fa-solid fa-check"></i>
                  </span>
                </div>
                <p className="font-semibold progress-text text-sm md:text-base">
                  Attempt {attempt.attempt_no}:{" "}
                  {attempt.status === "test_passed" ? "Passed" : "Failed"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DrivingLicenseSection;
