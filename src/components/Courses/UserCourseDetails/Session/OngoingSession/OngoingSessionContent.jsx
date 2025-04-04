import React, { useEffect, useState } from "react";
import signs from "../../../../../assets/images/signsImage.png";
import drivingLesson from "../../../../../assets/images/instructor.png";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { toggleOpenRateInstructor } from "../../../../../redux/slices/sessionSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const OngoingSessionContent = () => {
  const dispatch = useDispatch();
  const [trainer, setTrainer] = useState({ name: "Loading...", profile_pic: "" });

  useEffect(() => {

    const fetchTrainerDetails = async () => {
      const userid= localStorage.getItem("user_id");
      console.log("User ID:", userid);
      try {
        const response = await axios.get(
          `https://driving.shellcode.cloud/trainer/api/bookings/trainer/getTrainerDetails/${userid}`,
          { headers: { "Content-Type": "application/json" } }
        );
        const trainerData = response.data.trainerDetails[0];
        setTrainer({ name: trainerData.name, profile_pic: trainerData.profile_pic });
      } catch (error) {
        console.error("Error fetching trainer details:", error);
        setTrainer({ name: "nick", profile_pic: "" });
      }
    };
    fetchTrainerDetails();
  }, []);

  const handleOpenRating = () => {
    dispatch(toggleOpenRateInstructor(true));
  };

  return (
    <div className="mb-5 bg-white rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleOpenRating}>
          <img
            alt="instructor"
            src={trainer.profile_pic || "https://placehold.co/400"}
            className="h-10 w-10 rounded-md"
          />
          <div className="text-sm">
            <p className="font-semibold">{trainer.name}</p>
            <p className="text-xs">Instructor</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          {/* <div className="bg-gray-100 p-2 text-lg rounded-lg">
            <BsFillChatSquareTextFill />
          </div> */}
          {/* <div className="bg-gray-100 p-2 text-lg rounded-lg">
            <IoCall />
          </div> */}
        </div>
      </div>
      <p>
        {` Learn the driving rules for your location. Before you get a permit, it's
        important to be aware of the rules of driving and the basic safety
        precautions you should take as a responsible driver.`}
      </p>
      <img alt="sign" src={signs} className="my-6 rounded-lg" />
      <p>{`• Read the driver's handbook provided by the DMV or your local department that regulates driving and automobiles.`}</p>
      <p>{`• Some basic rules and common-sense safety precautions that everyone should know include: stopping for pedestrians, obeying traffic signs, staying within the speed limit, handling emergencies, and wearing your seatbelt.`}</p>
      <img alt="drivingLesson" src={drivingLesson} className="my-8 rounded-lg" />
      <p>{`Get your learner's permit. A learner's permit allows you to drive under the supervision of an experienced driver who has a valid driver's license for the vehicle you will use to practice.`}</p>
    </div>
  );
};

export default OngoingSessionContent;
