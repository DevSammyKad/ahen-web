import React, { useRef, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toggleOpenEndSession } from "../../../../redux/slices/sessionSlice";

const EndSession = () => {
  const [endSession, setEndSession] = useState(false);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const isEndSessionOpen = useSelector(
    (state) => state.session.isEndSessionOpen
  );

  const handleInputChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    console.log("Submitted OTP:", otpValue);
  };

  return !endSession ? (
    <div
      className={`fixed inset-0 z-50 flex justify-end items-center ${
        isEndSessionOpen ? "" : "pointer-events-none"
      }`}>
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300  ${
          isEndSessionOpen ? "opacity-100 backdrop-blur-sm" : "opacity-0"
        }`}
        onClick={() => {
          dispatch(toggleOpenEndSession(false));
        }}></div>

      <div
        className={`relative right-0 top-0 h-screen z-50 w-96 px-5 bg-[#F3F4F6] shadow-lg transform transition-transform duration-300 ease-in-out rounded-2xl ${
          isEndSessionOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex items-center w-full relative">
          <LuArrowLeft
            className="absolute left-0 text-xl cursor-pointer"
            onClick={() => {
              dispatch({ type: "CLOSE_END_SESSION" });
            }}
          />
          <h2 className="flex-1 text-center p-4 font-semibold text-lg">
            End Session
          </h2>
        </div>
        <div className="flex flex-col h-3/4 justify-center">
          <div className="px-8 py-6  bg-white rounded-xl text-center">
            <p className="font-semibold  mb-4">
              Are you sure you want to end your session?
            </p>
            <p className="text-xs">
              Make sure your session is complete and the instructor dropped you
              off to your house
            </p>
            <div className="flex items-center gap-4 text-center justify-center mt-7 font-normal">
              <button className="text-sm px-8 py-2 bg-black text-white rounded-lg">
                Not Now!
              </button>
              <button
                className="text-sm px-8 py-2 bg-black text-white rounded-lg"
                onClick={() => setEndSession(true)}>
                Yes!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`fixed inset-0 z-50 flex justify-end items-center ${
        isEndSessionOpen ? "" : "pointer-events-none"
      }`}>
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isEndSessionOpen ? "opacity-100 backdrop-blur-sm" : "opacity-0"
        }`}
        onClick={() => {
          dispatch(toggleOpenEndSession(false));
        }}></div>
      <div
        className={`absolute right-0 top-0 h-screen z-50 w-96 px-5 bg-white shadow-lg transform transition-transform duration-300 ease-in-out rounded-2xl ${
          isEndSessionOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex items-center w-full relative">
          <LuArrowLeft
            className="absolute left-0 text-xl cursor-pointer"
            onClick={() => {}}
          />
          <h2 className="flex-1 text-center p-4 font-semibold text-lg">
            Session OTP
          </h2>
        </div>
        <div className="flex flex-col h-4/5 justify-center items-center">
          <p className="mb-5">Input session OTP and end your session</p>
          <p className="text-sm text-[#AEAEAE]">
            We have sent an OTP to the number
          </p>
          <p className="text-sm ">+91 77385 46983</p>
          <div className="flex gap-4 mt-5">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                maxLength={1}
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-12 h-12 text-center  rounded-lg outline-none bg-gray-200"
                onChange={(e) => handleInputChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>
          <button
            onClick={"handleSubmit"}
            className="mt-7 px-8 py-3 bg-black text-xs text-white rounded-lg ">
            Verify OTP
          </button>
          <div className="flex gap-1 items-center text-xs mt-4">
            <p className="text-[#AEAEAE]">Resend OTP:</p>
            <p>57s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndSession;
