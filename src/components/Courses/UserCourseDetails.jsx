import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import Navbar from "../Navbar";

import { useSelector } from "react-redux";
import cardImage1 from "../../assets/images/homeCardImage.png";
import UserCourseImage from "./UserCourseDetails/UserCourseImage";
import UserProgressBanner from "./UserCourseDetails/UserProgressBanner";
import UserTabContent from "./UserCourseDetails/UserTabContent";
import UserTabNavigation from "./UserCourseDetails/UserTabNavigation";

import DrivingReport from "./UserCourseDetails/DrivingReport";
import SessionBooking from "./UserCourseDetails/Session/SessionBooking";

const UserCourseDetails = () => {
  const location = useLocation();
  const { course, sessions, progressPercentage } = location.state;

  const [activeTab, setActiveTab] = useState("courseContent");
  const [openIndex, setOpenIndex] = useState(null);

  const isReportOpen = useSelector((state) => state.report.isReportOpen);
  const isSessionBookingOpen = useSelector(
    (state) => state.session.isSessionBookingOpen
  );

  const toggleDropdown = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="bg-[#F3F4F6] pb-20">
      <Navbar />
      <div className="px-4 md:px-24">
        <Breadcrumb />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
          <div className="md:col-span-1 col-span-2">
            <UserCourseImage course={course} image={cardImage1} />
          </div>
          <div className="md:pl-8 pt-8 md:col-span-1 col-span-2">
            <p className="text-xl font-medium">{course.courseTitle}</p>
            <p className="text-sm mt-1">{sessions} Session</p>
            <div className="mt-10">
              <UserProgressBanner progress={progressPercentage} />
            </div>
          </div>
        </div>

        <UserTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <UserTabContent
          activeTab={activeTab}
          course={course}
          toggleDropdown={toggleDropdown}
          openIndex={openIndex}
        />
      </div>
      {isReportOpen && <DrivingReport />}

      {isSessionBookingOpen && <SessionBooking />}
    </div>
  );
};

export default UserCourseDetails;
