import React from 'react';

const Tabs = ({ tabs, selectedTab, setSelectedTab }) => {
  return (
    <div className="flex gap-4 overflow-x-auto sm:justify-center px-4 py-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setSelectedTab(tab)}
          className={`px-4 py-2 text-sm rounded-lg ${
            selectedTab === tab
              ? 'bg-black text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
