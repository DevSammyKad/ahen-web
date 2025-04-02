import React from "react";

const SessionTabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <div className="flex items-center gap-20  text-sm text-[#616161] md:px-10 select-none">
        <p
          className={`cursor-pointer ${
            activeTab === "You'll learn" ? "text-black " : ""
          }`}
          onClick={() => setActiveTab("You'll learn")}>
          {`You'll learn`}
        </p>
        <p
          className={`cursor-pointer ${
            activeTab === "tips" ? "text-black " : ""
          }`}
          onClick={() => setActiveTab("tips")}>
          Tips
        </p>
      </div>
      <div className="flex justify-start mt-2 ">
        <div className="flex md:w-6/12 w-6/12 justify-between">
          <hr
            className={`h-[3px] ${
              activeTab === "You'll learn"
                ? "w-[50%] bg-black"
                : "w-[50%] bg-[#D1D5DB]"
            }`}
            style={{ transition: "all 0.3s" }}
          />
          <hr
            className={`h-[3px] ${
              activeTab === "tips" ? "w-[50%] bg-black" : "w-[50%] bg-[#D1D5DB]"
            }`}
            style={{ transition: "all 0.3s" }}
          />
        </div>
      </div>
    </>
  );
};

export default SessionTabNavigation;
