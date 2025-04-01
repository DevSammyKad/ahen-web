import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CourseImage from "./CourseDetails/CourseImage";
import CourseInfo from "./CourseDetails/CourseInfo";
import SessionButtons from "./CourseDetails/SessionButtons";
import PaymentButtons from "./CourseDetails/PaymentButtons";
import TabNavigation from "./CourseDetails/TabNavigation";
import TabContent from "./CourseDetails/TabContent";
import Breadcrumb from "../Breadcrumb";
import Navbar from "../Navbar";

import cardImage1 from "../../assets/images/homeCardImage.png";

const CourseDetails = () => {
  const [sessionType, setSessionType] = useState(null);

  const location = useLocation();
  const { course } = location.state;

  const [activeTab, setActiveTab] = useState("courseContent");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="bg-[#F3F4F6] pb-20">
      <Navbar />
      <div className="px-4 sm:px-10 lg:px-24">
        <Breadcrumb />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
          <div className="md:col-span-1 col-span-2">
            <CourseImage course={course} image={course?.image || cardImage1} />
          </div>
          <div className="md:col-span-1 col-span-2">
            <CourseInfo course={course} />

            <hr className="md:w-[70%] w-full my-6 h-[2px] bg-black" />

            <PaymentButtons course={course} sessionType={sessionType} />
          </div>
        </div>

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <TabContent
          activeTab={activeTab}
          course={course}
          toggleDropdown={toggleDropdown}
          openIndex={openIndex}
        />
      </div>
    </div>
  );
};

export default CourseDetails;
