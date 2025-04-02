import React, { useState } from "react";
import drivingImage from "../../../../assets/images/driving.png";
import Breadcrumb from "../../../Breadcrumb";
import Navbar from "../../../Navbar";
import SessionTabContent from "./SessionTabContent";
import SessionTabNavigation from "./SessionTabNavigation";
import { CiCalendar } from "react-icons/ci";
import { BsArrowRight } from "react-icons/bs";
import SessionBooking from "./SessionBooking";
import { useDispatch, useSelector } from "react-redux";
import StartSession from "./StartSession";
import {
  toggleOpenEndSession,
  toggleOpenStartSession,
} from "../../../../redux/slices/sessionSlice";
import EndSession from "./EndSession";
import { useLocation } from "react-router-dom";

const Session = () => {
  const [activeTab, setActiveTab] = useState("You'll learn");

  const dispatch = useDispatch();

  const location = useLocation();
  const sessionData = location.state.lesson; 
  console.log()

  const handleOpenStartSession = () => {
    dispatch(toggleOpenStartSession(true));
  };

  const handleOpenEndSession = () => {
    dispatch(toggleOpenEndSession(true));
  };

  return (
    <div className="relative bg-[#F3F4F6] pb-20">
      <Navbar />
      <div className="px-4 sm:px-10 lg:px-24">
        <Breadcrumb />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
          <div className="md:col-span-1 col-span-2">
            <img
              alt="driving"
              src={sessionData.image}
              className="w-full rounded-lg shadow-lg"
            />
            {/* <div className="flex items-center justify-end mt-6">
              <button className="bg-black text-white flex items-center gap-2 px-4 py-3 rounded-lg">
                <CiCalendar className="text-xl" />
                <p className="text-sm">Book Session</p>
                <BsArrowRight className="text-lg font-light ml-5" />
              </button>
            </div> */}
            <div className="flex items-center justify-end mt-6">
              <button
                className="bg-black text-white flex items-center gap-2 px-4 py-3 rounded-lg"
                onClick={handleOpenStartSession}
              >
                <CiCalendar className="text-xl" />
                <p className="text-sm">Start Session</p>
                <BsArrowRight className="text-lg font-light ml-5" />
              </button>
            </div>
            {/* <div className="flex items-center justify-end mt-6">
              <button
                className="bg-black text-white flex items-center gap-2 px-4 py-3 rounded-lg"
                onClick={handleOpenEndSession}
              >
                <CiCalendar className="text-xl" />
                <p className="text-sm">End Session</p>
                <BsArrowRight className="text-lg font-light ml-5" />
              </button>
            </div> */}
          </div>
          <div className="pl-2 md:col-span-1 col-span-2">
            <SessionTabNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <SessionTabContent
              activeTab={activeTab}
              youLearn={sessionData.youlearn}
              tips={sessionData.tips}
            />
          </div>
        </div>
      </div>
      <StartSession />
      <EndSession />
    </div>
  );
};

export default Session;
