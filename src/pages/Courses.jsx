import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import AllCourseCards from "../components/Courses/AllCoursesCards";
import Navbar from "../components/Navbar";
import UserCourses from "../components/Courses/UserCourses";

const Courses = () => {
  return (
    <div className="bg-[#F3F4F6] pb-20">
      <Navbar />
      <div className="px-4 sm:px-10 lg:px-24 ">
        <Breadcrumb />
        <div className="my-5">
          <UserCourses />
        </div>
        <AllCourseCards />
      </div>
    </div>
  );
};

export default Courses;
