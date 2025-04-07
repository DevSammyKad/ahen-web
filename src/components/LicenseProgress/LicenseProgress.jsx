import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Attached_one from '../Images/Attached-one.svg';
import Attached_two from '../Images/Attached-two.svg';

import toast from 'react-hot-toast';
import LearningLicenseTracker from './LearningLicenseTracker';
import DrivingLicenseTracker from './DrivingLicenseTracker';
import DrivingLicenseTrackerFinal from './DrivingLicenseTrackerFinal';

function LicenseProgress() {
  const [learningData, setLearningData] = useState(null);
  const [drivingData, setDrivingData] = useState({});

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');

    // const storedUserId = 152;

    if (!storedUserId) {
      toast.error('User ID not found. Please log in again.');
      return;
    }

    console.log('Stored User ID:', storedUserId);

    const fetchLearningData = async () => {
      try {
        const response = await fetch(
          `https://driving.shellcode.cloud/api/progress/learning/${storedUserId}`
        );
        const data = await response.json();
        setLearningData(data.data || {});
      } catch (error) {
        console.error('Error fetching learning data:', error);
      }
    };

    const fetchDrivingData = async () => {
      try {
        const response = await fetch(
          `https://driving.shellcode.cloud/api/progress/driving/${storedUserId}`
        );
        const data = await response.json();
        setDrivingData(data.data);
      } catch (error) {
        console.error('Error fetching driving data:', error);
      }
    };

    fetchLearningData();
    fetchDrivingData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full rounded-lg p-8 mt-3">
        <div className="flex flex-col md:flex-row gap-4 mb-16">
          <div className="flex items-center rounded-xl bg-[#fff] p-3">
            <img
              src={Attached_two}
              alt="Learner's License"
              className="w-16 h-16 md:w-24 md:h-24"
            />
            <div className="ml-4">
              <h3 className="font-semibold text-gray-700 text-lg md:text-xl">
                Learner’s License
              </h3>
              <p className="text-light text-black-400 text-sm md:text-base">
                Easily apply for your learner’s license with our step-by-step
                guidance.
              </p>
            </div>
          </div>
          <div className="flex items-center rounded-xl bg-[#fff] p-3">
            <img
              src={Attached_one}
              alt="Driving License"
              className="w-16 h-16 md:w-24 md:h-24"
            />
            <div className="ml-4">
              <h3 className="font-semibold text-gray-700 text-lg md:text-xl">
                Driving License
              </h3>
              <p className="text-light text-black-400 text-sm md:text-base">
                Easily navigate the driving license application with our
                assistance at every step.
              </p>
            </div>
          </div>
        </div>
        <div className="text-2xl font-semibold text-gray-800 mb-6">
          <h2>License Progress</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-3 max-w-7xl ">
          {/* {learningData && <LearningLicense data={learningData} />}
          {drivingData && <DrivingLicenseSection data={drivingData} />}
           */}

          {!learningData ? (
            <a
              href="/learning-license"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-blue-500 hover:underline mt-1 inline-block"
            >
              Apply for Learning License
            </a>
          ) : (
            <LearningLicenseTracker data={learningData} />
          )}

          {!drivingData ? (
            <a
              href="/driving-license"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-blue-500 hover:underline mt-1 inline-block cursor-pointer"
            >
              Apply for Driving License
            </a>
          ) : (
            <DrivingLicenseTrackerFinal data={drivingData} />
            // <DrivingLicenseTracker data={drivingData} />
          )}
        </div>
      </div>
    </>
  );
}

export default LicenseProgress;
