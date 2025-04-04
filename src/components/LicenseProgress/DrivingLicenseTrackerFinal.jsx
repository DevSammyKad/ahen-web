import { Check, ChevronDown, Clock, Download, X } from 'lucide-react';

import React from 'react';
// import { format } from 'date-fns';

import InstructorAvatar from '../../assets/images/InstructorAvatar.png';
const DrivingLicenseTracker = ({ data }) => {
  // console.log('Driving License Data:', data.current_step);

  console.log('Final Data:', JSON.stringify(data, null, 2));

  if (!data) {
    return <p>Data Not Found for Driving License...</p>;
  }

  const drivingLicenseData = data;

  console.log(
    'Type of test_attempts:',
    typeof drivingLicenseData.test_attempts
  );

  const parsedAttempts = (() => {
    if (typeof drivingLicenseData.test_attempts === 'string') {
      try {
        return JSON.parse(drivingLicenseData.test_attempts);
      } catch {
        return [];
      }
    }
    return Array.isArray(drivingLicenseData.test_attempts)
      ? drivingLicenseData.test_attempts
      : [];
  })();

  console.log('Type of test_attempts:', typeof parsedAttempts);

  const failedAttempts = parsedAttempts.filter(
    (attempt) => attempt.status === 'test_failed'
  );

  const passedAttempts = parsedAttempts.filter(
    (attempt) => attempt.status === 'test_passed'
  );

  const isStepCompleted = (stepNumber) => {
    return drivingLicenseData.current_step > stepNumber;
  };

  const isCurrentStep = (stepNumber) => {
    return drivingLicenseData.current_step === stepNumber;
  };

  const testAttempts = JSON.parse(drivingLicenseData.test_attempts || '[]');

  const isRetestSlot = () => {
    // Check if there's at least one failed test in the history
    const hasFailedTests = parsedAttempts.some(
      (attempt) => attempt.status === 'test_failed'
    );

    // And the current status is slot_booked
    return hasFailedTests && drivingLicenseData.status === 'slot_booked';
  };

  return (
    <div>
      <h3 className="font-medium text-gray-800 mb-4 text-2xl">
        2. Driving License
      </h3>

      <div className="space-y-1">
        {/* Step 1 */}
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-4">
            <div
              className={`w-6 h-6 ${
                isStepCompleted(0) ? 'bg-black' : 'bg-gray-300'
              } rounded-full flex items-center justify-center`}
            >
              {isStepCompleted(1) ? (
                <Check className="w-3.5 h-3.5 text-white" />
              ) : isCurrentStep(1) ? (
                <Clock className="w-3.5 h-3.5 text-white animate-pulse" />
              ) : null}
            </div>
            <div className="w-0.5 h-12 bg-gray-300"></div>
          </div>
          <div className="pt-0.5 space-y-2">
            <p className="text-sm text-gray-800">Book DL Test Slot</p>
            <div className="flex items-start flex-col justify-between">
              {/* Book Slot Button (if no slot booked) */}
              {!drivingLicenseData.slot_datetime ? (
                <button className="bg-black text-white text-xs px-4 py-1.5 rounded-lg flex items-center w-fit">
                  Book Slot
                </button>
              ) : (
                <div className="bg-gray-100 p-2 rounded-md mt-2 flex justify-between items-center space-x-3 ">
                  <p className="text-xs">
                    Slot Booked For{' '}
                    {formatDate(drivingLicenseData.slot_datetime)}
                  </p>
                  {failedAttempts.length > 0 && (
                    <div className="bg-gray-100 p-2 rounded-md flex items-center space-x-3">
                      <p className="text-xs text-red-500 flex items-center gap-2">
                        <X /> Test Failed
                      </p>
                    </div>
                  )}
                </div>
              )}
              {/* How to Identify This Is Retest Slot */}
              {isRetestSlot() && (
                <div className="bg-gray-100 p-2 rounded-md mt-2 flex items-center space-x-3">
                  <p className="text-xs text-gray-800">
                    Retest Slot Booked for{' '}
                    {formatDate(drivingLicenseData.slot_datetime)}
                  </p>
                  <span className="text-xs text-blue-600 font-medium">
                    {drivingLicenseData.status === 'test_passed'
                      ? 'Test Passed'
                      : ''}
                  </span>
                </div>
              )}

              {/* Show Test Passed separately if applicable */}
              {drivingLicenseData.status === 'dispatched' ||
                (drivingLicenseData.status === 'delivered' &&
                  drivingLicenseData.test_passed_at && (
                    <div className="bg-green-100 p-2 rounded-md mt-2 flex items-center space-x-3">
                      <Check className="w-4 h-4 text-green-500" />
                      <p className="text-xs text-green-800">
                        Test Passed on{' '}
                        {formatDate(drivingLicenseData.test_passed_at)}
                      </p>
                    </div>
                  ))}

              {drivingLicenseData.status === 'test_failed' && (
                <div className="flex items-center gap-2 mt-2 w-full">
                  <a
                    href={''}
                    className="bg-black text-white text-xs px-2 py-1.5 rounded-lg flex items-center w-full max-w-40"
                  >
                    Pay Retest Fee
                  </a>
                  <p className="text-xs text-gray-500">
                    You have to pay a retest fee of Rs 300/- to book a retest
                    slot
                  </p>
                </div>
              )}
              {/* Show Initial Slot Booking */}
              {/* {testAttempts.length > 0 && (
                <div className="bg-gray-100 p-2 rounded-md mt-2 flex justify-between items-center space-x-3 ">
                  <p className="text-xs">
                    Slot Booked For {formatDate(testAttempts[0].slot_datetime)}
                  </p>
                  {testAttempts[0].status === 'test_failed' && (
                    <span className="text-xs text-red-500 font-medium">
                      Test Failed
                    </span>
                  )}
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-4">
            <div
              className={`w-6 h-6 ${
                isStepCompleted(1) ? 'bg-black' : 'bg-gray-300'
              } rounded-full flex items-center justify-center`}
            >
              {isStepCompleted(2) ? (
                <Check className="w-3.5 h-3.5 text-white" />
              ) : isCurrentStep(2) ? (
                <Clock className="w-3.5 h-3.5 text-white" />
              ) : null}
            </div>
            <div className="w-0.5 h-36 bg-gray-300"></div>
          </div>
          <div className="pt-0.5 space-y-3">
            <p className="text-sm text-gray-800">Driving License Test</p>

            {drivingLicenseData.status === 'test_pending' && (
              <div className="bg-gray-100 p-4 rounded-md space-y-2">
                <p className="text-xs text-gray-800">
                  Slot: {formatDate(drivingLicenseData.slot_datetime)}
                </p>
                <p className="text-xs text-gray-800">
                  Vehicle No: {drivingLicenseData.vehicle_no || 'N/A'}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={
                      drivingLicenseData.instructor_image || InstructorAvatar
                    }
                    alt={drivingLicenseData.instructor_name || 'Instructor'}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-xs font-medium">
                      {drivingLicenseData.instructor_name || 'Unknown'}
                    </p>
                    <p className="text-xs text-gray-500">Instructor</p>
                  </div>
                </div>
              </div>
            )}
            {parsedAttempts.map((test, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-md space-y-2">
                <p className="text-xs text-gray-800">
                  Slot: {formatDate(test.slot_datetime)}
                </p>
                <p className="text-xs text-gray-800">
                  Vehicle No: {test.vehicle_no || 'N/A'}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={test.instructor_image || InstructorAvatar}
                    alt={test.instructor_name || 'Instructor'}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-xs font-medium">
                      {test.instructor_name || 'Unknown'}
                    </p>
                    <p className="text-xs text-gray-500">Instructor</p>
                  </div>
                </div>
                {test.status === 'test_failed' ? (
                  <DrivingTestFailedStatus status={test} />
                ) : test.status === 'test_passed' ? (
                  <DrivingTestPassStatus status={test} />
                ) : (
                  <DrivingTestPendingStatus status={test} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-4">
            <div
              className={`w-6 h-6 ${
                isStepCompleted(2) ? 'bg-black' : 'bg-gray-300'
              } rounded-full flex items-center justify-center`}
            >
              {isStepCompleted(3) ? (
                <Check className="w-3.5 h-3.5 text-white" />
              ) : isCurrentStep(3) ? (
                <Clock className="w-3.5 h-3.5 text-white" />
              ) : null}
            </div>
            <div className="w-0.5 h-12 bg-gray-300"></div>
          </div>
          <div className="pt-0.5">
            <p className="text-sm text-gray-800">Driving License Dispatch</p>
            {drivingLicenseData?.dispatch_date !== null && (
              <span className="text-xs text-blue-500 mt-1 ">
                {' '}
                Dispatch Date :{formatDate(
                  drivingLicenseData?.dispatch_date
                )}{' '}
              </span>
            )}
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-4">
            <div
              className={`w-6 h-6 ${
                drivingLicenseData.status === 'delivered'
                  ? 'bg-black'
                  : 'bg-gray-300'
              } rounded-full flex items-center justify-center`}
            >
              {drivingLicenseData.status === 'delivered' ? (
                <Check className="w-3.5 h-3.5 text-white" />
              ) : isCurrentStep(4) ? (
                <Clock className="w-3.5 h-3.5 text-white" />
              ) : null}
            </div>
          </div>
          <div className="pt-0.5">
            <p className="text-sm text-gray-800">Driving License Delivered</p>
            {drivingLicenseData?.delivery_date !== null && (
              <span className="text-xs text-blue-500 mt-1 ">
                {' '}
                Delivery Date :{formatDate(
                  drivingLicenseData?.delivery_date
                )}{' '}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DrivingTestPassStatus = ({ status }) => {
  return (
    <div className="flex items-center justify-between bg-gray-200 p-2 rounded-md">
      <Check className="w-4 h-4 text-green-500 mr-1.5" />
      <p className="text-xs text-green-500">Test Passed</p>
      <p className="text-xs text-gray-500 ml-2">
        {formatDate(status.test_date)}
      </p>
    </div>
  );
};

const DrivingTestPendingStatus = ({ status }) => {
  return (
    <div className="flex items-center justify-between bg-gray-200 p-2 rounded-md">
      <Clock className="w-4 h-4 text-yellow-500 mr-1.5" />
      <p className="text-xs text-yellow-500">Test Pending</p>
      <p className="text-xs text-gray-500 ml-2">
        {' '}
        {formatDate(status.test_date)}
      </p>
    </div>
  );
};

const DrivingTestFailedStatus = ({ status }) => {
  return (
    <div className="flex items-center justify-between bg-gray-200 p-2 rounded-md">
      <X className="w-4 h-4 text-red-500 mr-1.5" />
      <p className="text-xs text-red-500">Test Failed</p>
      <p className="text-xs text-gray-500 ml-2">
        {' '}
        {formatDate(status.test_date)}
      </p>
    </div>
  );
};

const formatDate = (dateString) => {
  if (!dateString) return '';

  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(dateString));
  } catch (e) {
    return dateString;
  }
};
export default DrivingLicenseTracker;
