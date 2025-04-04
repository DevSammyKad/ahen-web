import React from 'react';

const LicenseProgress = ({ data }) => {
  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="bg-gray-50 min-h-screen p-4 md:p-6">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6"></div>
      </div>
      <div className="rounded-lg bg-[#fff] p-6">
        <h2 className="text-xl progress-heading mb-6">1. Learning License</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="h-5 w-5 bg-black rounded-full flex items-center justify-center relative">
              <span className="text-white">
                <i className="fa-solid fa-check"></i>
              </span>
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0.5 h-6 progress-stick"></div>
            </div>
            <p className="font-semibold progress-text text-sm md:text-base">
              Your details are under Review
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-5 w-5 bg-progress flex items-center justify-center relative">
              <span className="text-white">
                <i className="fa-solid fa-check"></i>
              </span>
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0.5 h-5 progress-stick"></div>
            </div>
            <p className="font-semibold progress-text text-sm md:text-base">
              License is being Processed
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-5 w-5 bg-progress rounded-full flex items-center justify-center relative">
              <span className="text-white">
                <i className="fa-solid fa-check"></i>
              </span>
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0.5 h-6 progress-stick"></div>
            </div>
            <p className="font-semibold progress-text text-sm md:text-base">
              Application Submitted
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-5 w-5 bg-progress rounded-full flex items-center justify-center relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0.5 h-6 progress-stick-loading"></div>
            </div>
            <p className="font-medium progress-text text-sm md:text-base">
              Learning License Test
            </p>
          </div>
          <div className="mx-8">
            <div className="space-y-2">
              <p className="text-red-500 text-sm md:text-base ">
                <span className="bg-gray-100 shadow-md p-1 rounded-md">
                  <i className="fa-solid fa-xmark"></i> Test Failed
                </span>{' '}
                <span className="text-black mx-2 p-2">
                  2 attempts are remaining
                </span>
              </p>
            </div>
          </div>
          <div className="mx-8">
            <div className="space-y-2">
              <p className="text-[#0070FF] text-sm md:text-base">
                <span className="bg-gray-100 shadow-md p-1 rounded-md mb-7">
                  <i className="fa-solid fa-check"></i> Test Passed{' '}
                </span>{' '}
                <span className="text-gray-500 mx-2">22nd Nov at 12:00 PM</span>
              </p>
            </div>
          </div>
          <div className="mx-8 rounded-lg bg-[#F3F4F6] p-4">
            <p className="font-medium text-black text-sm md:text-base">
              Application ID : 1976187524{' '}
              <span className="text-gray-400 cursor-pointer">
                <i className="fa-solid fa-copy"></i>
              </span>
            </p>
            <p className="font-medium text-black text-sm md:text-base">
              Pass: 25Ronaldo*{' '}
              <span className="text-gray-400 cursor-pointer">
                <i className="fa-solid fa-copy"></i>
              </span>
            </p>
            <p className="font-medium text-black text-sm md:text-base">
              Test Link :{' '}
              <a href="https://4born.in/" className="text-[#0070FF]">
                https://4born.in/
              </a>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-5 w-5 border-progress-loading rounded-full flex items-center justify-center relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0.5 h-3 bg-black hidden"></div>
            </div>
            <p className="font-medium text-progress-loading text-sm md:text-base">
              Download Learning License
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="mt-6 text-sm text-white bg-black p-4 rounded-lg">
          Your Learning License is valid from <strong>12th October 2022</strong>{' '}
          to <strong>12th April 2023</strong>. You can give the Permanent
          license test anytime within this period.
        </p>
      </div>
    </div>
  );
};

export default LicenseProgress;
