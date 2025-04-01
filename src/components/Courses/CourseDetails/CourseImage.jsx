import React from 'react';
import ErrorImage from '../../../assets/images/homeCardImage.png';

const CourseImage = ({ course, image }) => (
  <div className="bg-white rounded-lg flex-1 h-[95%] flex items-stretch">
    <img
      alt={course?.title}
      src={image}
      onError={(e) => (e.target.src = ErrorImage)}
      className="w-full h-full rounded-lg"
    />
  </div>
);

export default CourseImage;
