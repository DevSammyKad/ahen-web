import React from "react";

const UserCourseImage = ({ course, image }) => (
  <div className="bg-white rounded-lg flex-1 h-[95%] flex items-stretch">
    <img
      alt={course?.course}
      src={image}
      className="w-full h-full rounded-lg"
    />
  </div>
);

export default UserCourseImage;
