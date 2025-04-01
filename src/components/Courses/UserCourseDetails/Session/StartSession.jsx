import React, { useState, useRef } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { FaTriangleExclamation } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleOpenStartSession } from "../../../../redux/slices/sessionSlice";

const StartSession = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const dispatch = useDispatch();

  const isStartSessionOpen = useSelector(
    (state) => state.session.isStartSessionOpen
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

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end items-center ${
        isStartSessionOpen ? "" : "pointer-events-none"
      }`}>
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isStartSessionOpen ? "opacity-100 backdrop-blur-sm" : "opacity-0"
        }`}
        onClick={() => {
          dispatch(toggleOpenStartSession(false));
        }}></div>
      <div
        className={`absolute right-0 top-0 h-screen z-50 w-96 px-5 bg-white shadow-lg transform transition-transform duration-300 ease-in-out rounded-2xl ${
          isStartSessionOpen ? "translate-x-0" : "translate-x-full"
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
          <p className="mb-5">Input session OTP and start your session</p>
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
            onClick={handleSubmit}
            className="mt-7 px-8 py-3 bg-black text-xs text-white rounded-lg ">
            Verify OTP
          </button>
          <div className="flex gap-1 items-center text-xs mt-4">
            <p className="text-[#AEAEAE]">Resend OTP:</p>
            <p>57s</p>
          </div>
          <div className="absolute  bottom-3">
            <div className="flex items-center  gap-3 rounded-lg text-xs bg-gray-200 px-4 py-1">
              <div className="bg-black p-1 rounded-full">
                <FaTriangleExclamation className="text-lg text-yellow-400" />
              </div>
              <p>Make sure your seatbelt is on</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartSession;
