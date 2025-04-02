import React from "react";

const CarTabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mt-6">
      <div className="flex md:inline-block md:justify-normal  justify-between items-center border-b border-gray-300">
        <button
          className={`py-2 px-4 text-sm ${
            activeTab === "about"
              ? "text-black font-semibold border-b-2 border-black"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("about")}>
          About
        </button>
        <button
          className={`py-2 px-4 text-sm ${
            activeTab === "reviews"
              ? "text-black font-semibold border-b-2 border-black"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("reviews")}>
          Reviews
        </button>
      </div>
    </div>
  );
};

export default CarTabNavigation;
