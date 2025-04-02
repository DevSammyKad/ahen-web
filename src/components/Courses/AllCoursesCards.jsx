import React, { useEffect, useState } from "react";
import CourseCard from "../CourseCard";

const AllCourseCards = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await fetch("https://driving.shellcode.cloud/api/courses");

      if (!res.ok) {
        console.error("Failed to get courses");
      }

      const data = await res.json();
      if (data?.data?.length > 0) {
        setCourses(data.data);
      }
    } catch (error) {
      console.error("Error occurred while fetching courses", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="px-4 py-6">
      <div className="mb-4 flex justify-between items-center">
        <p className="text-xl font-semibold text-gray-800">Courses</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No courses available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllCourseCards;
