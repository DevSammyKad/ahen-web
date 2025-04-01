import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";

const TabContent = ({ activeTab, course, toggleDropdown, openIndex }) => {
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

  return (
    <div className="mt-8 grid grid-cols-2 text-sm">
      <div className="md:col-span-1 col-span-2 rounded-lg">
        {activeTab === "courseContent" ? (
          <div className="mx-auto">
            {course?.content?.length > 0 &&
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
                      {day.sessions.map((session, i) => (
                        <div
                          key={i}
                          className="flex items-center py-5 pl-6 relative">
                          {i !== day.sessions.length - 1 && (
                            <span className="absolute left-[38px] top-14 h-2/5 border-l-2 border-gray-300"></span>
                          )}
                          <div className="w-7 h-7 flex items-center justify-center text-gray-700 font-bold bg-gray-100 rounded-md mr-4">
                            {i + 1}
                          </div>
                          <p className="text-gray-700">{session.title}</p>
                        </div>
                      ))}
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
            <p>{course.about}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabContent;
