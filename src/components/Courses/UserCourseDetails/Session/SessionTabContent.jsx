import React from "react";

const SessionTabContent = ({ activeTab, youLearn, tips }) => {
  return activeTab === "You'll learn" ? (
    <div className="my-5 bg-white rounded-xl p-4">
      {youLearn.map((item, index) => (
        <div key={index} className="mb-4">
          <p>{item.description}</p>
          {item.image && (
            <img
              alt={`youlearn-${index}`}
              src={item.image}
              className="my-4 rounded-lg"
            />
          )}
        </div>
      ))}
    </div>
  ) : (
    <div className="my-5 bg-white rounded-xl p-4">
      {tips.map((item, index) => (
        <div key={index} className="mb-4">
          <p>{item.description}</p>
          {item.image && (
            <img
              alt={`tip-${index}`}
              src={item.image}
              className="my-4 rounded-lg"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SessionTabContent;
