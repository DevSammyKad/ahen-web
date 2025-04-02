import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

import { IoDocumentTextOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toggleOpenReport } from "../../../redux/slices/reportSlice";
import { useNavigate } from "react-router-dom";
import { toggleOpenSessionBooking } from "../../../redux/slices/sessionSlice";

const UserTabContent = ({ activeTab, course, toggleDropdown, openIndex }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenReport = () => {
    dispatch(toggleOpenReport(true));
  };
  const handleOpenSessionBooking = (lesson) => {
    dispatch(
      toggleOpenSessionBooking({
        isOpen: true,
        session: lesson,
        course: course,
      })
    );
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) =>
      index < rating ? (
        <FaStar key={index} className="text-black" />
      ) : (
        <FaStar key={index} className="text-gray-400" />
      )
    );
  };

  const renderLessons = (lessons) => {
    let bookSessionIndex = lessons.findIndex(
      (lesson, index) =>
        !lesson.isCompleted && (index === 0 || lessons[index - 1].isCompleted)
    );

    return lessons.map((lesson, index) => (
      <div key={index} className="flex items-center py-5 pl-6 relative">
        {index !== lessons.length - 1 && (
          <span className="absolute left-[38px] top-14 h-2/5 border-l-[1px] border-black"></span>
        )}
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={() =>
            navigate(
              `/courses/user/${course.courseTitle
                .split(":")[0]
                .replace(" ", "-")}/${lesson.title
                .toLowerCase()
                .replace(" ", "-")}`,
              { state: { lesson } }
            )
          }>
          <div
            className={`w-7 h-7 flex items-center justify-center  text-gray-700 font-bold rounded-md mr-4  ${
              lesson.isCompleted ? "bg-black text-white" : "bg-gray-100"
            }`}>
            {lesson.isCompleted ? <FaCheck /> : index + 1}
          </div>
          <p className="text-gray-700">{lesson.title}</p>
        </div>
        <div className="ml-auto pr-4">
          {lesson.isCompleted ? (
            <button
              className="text-black flex gap-2 items-center px-2 py-1 rounded-md text-[11px] border border-black"
              onClick={handleOpenReport}>
              <IoDocumentTextOutline className="text-sm" />
              <p>View Report</p>
            </button>
          ) : bookSessionIndex === index ? (
            <button
              className=" px-3 py-1 rounded-md text-[11px] bg-black text-white border border-black"
              onClick={() => handleOpenSessionBooking(lesson)}>
              <p>Schedule Session</p>
            </button>
          ) : null}
        </div>
      </div>
    ));
  };

  return (
    <div className="mt-8 grid grid-cols-2 text-sm">
      <div className="md:col-span-1 col-span-2 rounded-lg">
        {activeTab === "courseContent" ? (
          <div className="mx-auto">
            {course.content.length > 0 &&
              course.content.map((day, index) => (
                <div
                  key={index}
                  className="border-gray-300 mb-5 bg-white rounded-lg shadow-lg">
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleDropdown(index)}>
                    <h2 className="text-sm font-semibold">{day.title}</h2>
                    {openIndex === index ? (
                      <FiMinus className="text-xl text-gray-600" />
                    ) : (
                      <FiPlus className="text-xl text-gray-600" />
                    )}
                  </div>
                  {openIndex === index && (
                    <div className="border-gray-300">
                      {renderLessons(day.sessions)}
                    </div>
                  )}
                </div>
              ))}
          </div>
        ) : activeTab === "reviews" ? (
          <div className="bg-white p-4 shadow-lg rounded-md">
            {course.reviews.length > 0 ? (
              course.reviews.map((review, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-semibold">{review.userName}</h4>

                    <span className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    {renderStars(review.starRating)}
                  </div>
                  <p className="text-gray-700 text-sm">{review.text}</p>
                </div>
              ))
            ) : (
              <p>No reviews</p>
            )}
          </div>
        ) : (
          <div className="bg-white p-4 shadow-lg rounded-md">
            <p>{course.courseAbout}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTabContent;
