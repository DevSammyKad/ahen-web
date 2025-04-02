import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../CourseCard';

const CourseCards = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await fetch('https://driving.shellcode.cloud/api/courses');

      if (!res.ok) {
        console.log('Failed to get session');
      }

      const data = await res.json();
      if (data?.data?.length > 0) {
        setCourses(data.data);
      }
    } catch (error) {
      console.log('Error occurred while fetching session');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-xl font-semibold">Courses</p>
        <p
          className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition"
          onClick={() => navigate('/courses')}
        >
          View all
        </p>
      </div>
      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">
        {courses &&
          courses.slice(0, 4).map((course, index) => (
            <div key={index}>
              <CourseCard course={course} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CourseCards;
