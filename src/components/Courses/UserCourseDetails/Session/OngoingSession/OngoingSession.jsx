import React from "react";
import drivingImage from "../../../../../assets/images/driving.png";
import Breadcrumb from "../../../../Breadcrumb";
import Navbar from "../../../../Navbar";

import { CiCalendar } from "react-icons/ci";

import { BsArrowRight } from "react-icons/bs";
import EndSession from "..//EndSession";
import StartSession from "../StartSession";
import OngoingSessionContent from "./OngoingSessionContent";
import RateInstructor from "../../../../RateInstructor";

const OngoingSession = () => {
  return (
    <div className="relative bg-[#F3F4F6] pb-20">
      <Navbar />
      <div className="px-4 sm:px-10 lg:px-24">
        <Breadcrumb />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
          <div className="md:col-span-1 col-span-2">
            <img
              alt="driving"
              src={drivingImage}
              className="w-full  rounded-lg shadow-lg"
            />
            <div className="flex items-center justify-end  mt-6 ">
              <button
                className="bg-black text-white flex items-center gap-2 px-4 py-3 rounded-lg"
                onClick={""}>
                <CiCalendar className="text-xl" />
                <p className="text-sm">End Session</p>
                <BsArrowRight className="text-lg font-light ml-5" />
              </button>
            </div>
          </div>
          <div className="pl-2 md:col-span-1 col-span-2">
            <OngoingSessionContent />
          </div>
        </div>
      </div>
      <StartSession />
      <EndSession />
      <RateInstructor />
    </div>
  );
};

export default OngoingSession;
