import React from "react";
import { FaStar } from "react-icons/fa6";

const UserCourseInfo = ({ course }) => (
  <div className="rounded-lg flex-1 p-6 flex flex-col justify-between">
    <div>
      <p className="text-xl font-medium">{course.course}</p>
      <div className="text-sm flex items-center gap-1 text-[#959595] mt-2">
        <span>
          <FaStar className="text-[#FF9F0D]" />
        </span>
        <span>{course?.starRating}</span>
        <span className="mx-2">({course?.reviews} ratings)</span>
      </div>
      <div className="text-lg font-semibold flex items-center gap-3 text-[#959595] mt-2">
        <p className="font-bold text-2xl text-black">{`₹${
          course.price - (course.price * course.discountPercent) / 100
        }`}</p>
        <span className="font-extralight line-through text-[#AAABAC]">{`₹${course.price}`}</span>
        <p className="text-xs text-[#61C36D] font-semibold">
          {course.discountPercent}% off
        </p>
      </div>
      <p className="text-xs text-[#AAABAC] mt-1">Inclusive of all taxes</p>
      <p className="text-sm mt-1 font-medium text-[#616161]">
        {course.session} Sessions
      </p>
    </div>
  </div>
);

export default UserCourseInfo;
