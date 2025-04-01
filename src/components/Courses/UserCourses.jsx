import React, { useEffect, useState } from "react";
import UserCourseCard from "./UserCourseCard";

const UserCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      console.error("User ID not found in localStorage");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://driving.shellcode.cloud/api/purchased-courses/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();
      const transformedCourses = data.purchased_courses.map((course) => {
        const totalSessions = course.content.reduce(
          (sum, content) => sum + content.sessions.length,
          0
        );

        const completedSessions = course.content.reduce(
          (sum, content) =>
            sum +
            content.sessions.filter(
              (session) => Boolean(session.isCompleted) // Convert 0/1 to boolean
            ).length,
          0
        );

        return {
          id: course.courseId,
          course: course,
          sessions: totalSessions,
          completedSessions,
          rating: course.courseRating,
        };
      });

      setCourses(transformedCourses);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-4 flex justify-between items-center">
        <p className="text-xl font-semibold text-gray-800">My Courses</p>
      </div>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <UserCourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-center">No courses found.</p>
        </div>
      )}
    </div>
  );
};

export default UserCourses;
