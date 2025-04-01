import React from "react";

import signs from "../../../../../assets/images/signsImage.png";
import drivingLesson from "../../../../../assets/images/instructor.png";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { toggleOpenRateInstructor } from "../../../../../redux/slices/sessionSlice";
import { useDispatch } from "react-redux";

const OngoingSessionContent = () => {
  const dispatch = useDispatch();

  const handleOpenRating = () => {
    dispatch(toggleOpenRateInstructor(true));
  };
  return (
    <div className="mb-5 bg-white rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleOpenRating}>
          <img
            alt="instructor"
            src={"https://placehold.co/400"}
            className="h-10 w-10 rounded-md"
          />
          <div className="text-sm">
            <p className="font-semibold">Jackie Chan</p>
            <p className="text-xs">Instructor</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="bg-gray-100 p-2 text-lg rounded-lg">
            <BsFillChatSquareTextFill />{" "}
          </div>
          <div className="bg-gray-100 p-2 text-lg rounded-lg">
            <IoCall />{" "}
          </div>
          <div className="relative bg-gray-100 px-5 font-semibold py-2 text-sm rounded-lg">
            <p className="bg-black text-xs text-white px-2  rounded-[5px] absolute top-[-25%] left-[25%]">
              OTP
            </p>
            <p>2576</p>
          </div>
        </div>
      </div>
      <p>
        {` Learn the driving rules for your location. Before you get a permit, it's
        important to be aware of the rules of driving and the basic safety
        precautions you should take as a responsible driver. It's much more
        advisable to learn the rules before you get behind the wheel so you
        don't wing it and make mistakes as you go along`}
      </p>
      <img alt="sign" src={signs} className="my-6 rounded-lg" />
      <p>{`• Read the driver's handbook provided by the DMV or your local department that regulates driving and automobiles. This may be found online on the official government website. If you do not learn the rules, you won't be able to get your permit.`}</p>
      <p>{`• Some basic rules and common-sense safety precautions that everyone should know include: stopping for pedestrians, obeying traffic signs, staying within the speed limit, handling emergencies, and wearing your seatbelt.`}</p>
      <img
        alt="drivingLesson"
        src={drivingLesson}
        className="my-8 rounded-lg"
      />
      <p>{`Get your learner's permit. A learner's permit allows you to drive under the supervision of an experienced driver who has a valid driver's license for the vehicle you will use to practice. All states require you to pass a knowledge test before issuing your permit. The minimum age for a learner's permit in most states is 16, some have it at 15, and only a few at 14 so check with your state's requirements.[2] Here are some general guidelines:`}</p>
    </div>
  );
};

export default OngoingSessionContent;
