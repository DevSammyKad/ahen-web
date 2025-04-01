import React, { useState } from "react";

const SessionButtons = ({ setSessionType, sessionType }) => {
  const handleButtonClick = (type) => {
    setSessionType(type);
  };

  return (
    <div className="flex flex-col gap-1 mt-5 text-xs text-center">
      <div className="flex md:w-[70%] w-full justify-between ">
        <button
          className={`w-[48%] px-5 py-3 rounded-lg ${
            sessionType === "group"
              ? "bg-black text-white"
              : "bg-transparent text-black "
          } border border-black`}
          onClick={() => handleButtonClick("group")}>
          Group Session
        </button>
        <button
          className={`w-[48%] px-5 py-3 rounded-lg ${
            sessionType === "one"
              ? "bg-black text-white"
              : "bg-transparent text-black "
          } border border-black`}
          onClick={() => handleButtonClick("one")}>
          One-to-One Session
        </button>
      </div>
    </div>
  );
};

export default SessionButtons;
