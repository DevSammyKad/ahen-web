import React from 'react';
import { FaStar } from 'react-icons/fa6';

import ErrorImage from '../assets/images/homeCardImage.png';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full md:w-[280px] bg-white pt-10 md:pt-14 pb-4 px-4 shadow-lg rounded-xl flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer"
      onClick={() =>
        navigate(`/courses/${course.title.split(':')[0].replace(' ', '-')}`, {
          state: { course },
        })
      }
    >
      <div>
        <img
          alt={course?.title}
          src={course?.image || ErrorImage}
          className="w-full h-32 "
          onError={(e) => (e.target.src = ErrorImage)}
        />
      </div>
      <div className="bg-[#EFF0F4] mt-6 px-3 py-2 rounded-md w-full md:w-full">
        <p className="text-xs font-semibold text-start">{course?.title}</p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-[#959595] mt-2">
            {course?.totalSession} Sessions
          </p>
          <div className="text-xs flex items-center gap-1  text-[#959595] mt-2">
            <span>
              <FaStar />
            </span>
            <span>{course?.starRating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
