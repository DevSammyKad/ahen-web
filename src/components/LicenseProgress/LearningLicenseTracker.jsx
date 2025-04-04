import {
  Check,
  ChevronDown,
  Clock,
  Copy,
  Cross,
  Download,
  X,
} from 'lucide-react';

export default function LearningLicenseTracker({ data }) {
  if (!data) {
    return <p>Loading...</p>;
  }

  const licenseData = data;

  // Helper function to determine if a step is completed
  const isStepCompleted = (stepNumber) => {
    return licenseData.current_step > stepNumber;
  };

  // Helper function to determine if a step is current
  const isCurrentStep = (stepNumber) => {
    return licenseData.current_step === stepNumber;
  };
  // Format date from ISO string

  return (
    <div>
      {/* Learning License Section */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-800 mb-4 text-2xl">
          1. Learning License
        </h3>

        <div className="space-y-1">
          {/* Step 1: Your details are under Review */}
          <div className="flex items-start">
            <div className="flex flex-col items-center mr-4">
              <div
                className={`w-6 h-6 ${
                  isStepCompleted(1) || isCurrentStep(1)
                    ? 'bg-black'
                    : 'bg-gray-300'
                } rounded-full flex items-center justify-center`}
              >
                {isStepCompleted(1) ? (
                  <Check className="w-3.5 h-3.5 text-white" />
                ) : isCurrentStep(1) ? (
                  <Clock className="w-3.5 h-3.5 text-white" />
                ) : null}
              </div>
              <div className="w-0.5 h-12 bg-gray-300"></div>
            </div>
            <div className="pt-0.5">
              <p className="text-sm text-gray-800">
                Your details are under Review
              </p>
              {isCurrentStep(1) && licenseData.status === 'under_review' && (
                <p className="text-xs text-blue-500 mt-1">
                  We are currently reviewing your details
                </p>
              )}
            </div>
          </div>

          {/* Step 2: License is being Processed */}
          <div className="flex items-start">
            <div className="flex flex-col items-center mr-4">
              <div
                className={`w-6 h-6 ${
                  isStepCompleted(2) || isCurrentStep(2)
                    ? 'bg-black'
                    : 'bg-gray-300'
                } rounded-full flex items-center justify-center`}
              >
                {isStepCompleted(2) ? (
                  <Check className="w-3.5 h-3.5 text-white" />
                ) : isCurrentStep(2) ? (
                  <Clock className="w-3.5 h-3.5 text-white" />
                ) : null}
              </div>
              <div className="w-0.5 h-12 bg-gray-300"></div>
            </div>
            <div className="pt-0.5">
              <p className="text-sm text-gray-800">
                License is being Processed
              </p>
              {isCurrentStep(2) && licenseData.status === 'processing' && (
                <p className="text-xs text-blue-500 mt-1">
                  Your license is currently being processed
                </p>
              )}
            </div>
          </div>

          {/* Step 3: Application Submitted */}
          <div className="flex items-start">
            <div className="flex flex-col items-center mr-4">
              <div
                className={`w-6 h-6 ${
                  isStepCompleted(3) || isCurrentStep(3)
                    ? 'bg-black'
                    : 'bg-gray-300'
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
              <p className="text-sm text-gray-800">Application Submitted</p>
              {isCurrentStep(3) && licenseData.application_id && (
                <p className="text-xs text-gray-500 mt-1">
                  Application ID: {licenseData.application_id}
                </p>
              )}
            </div>
          </div>

          {/* Step 4: Learning License Test */}
          <div className="flex items-start">
            <div className="flex flex-col items-center mr-4">
              <div
                className={`w-6 h-6 ${
                  isStepCompleted(4) || isCurrentStep(4)
                    ? 'bg-black'
                    : 'bg-gray-300'
                } rounded-full flex items-center justify-center`}
              >
                {isStepCompleted(4) ? (
                  <Check className="w-3.5 h-3.5 text-white" />
                ) : isCurrentStep(4) ? (
                  <Clock className="w-3.5 h-3.5 text-white" />
                ) : null}
              </div>
              <div className="w-0.5 h-12 bg-gray-300"></div>
            </div>
            <div className="pt-0.5 space-y-2">
              <p className="text-sm text-gray-800">Learning License Test</p>
              {/* isStepCompleted(4) && */}
              {licenseData.status === 'test_failed' && (
                <div>
                  <div className="bg-gray-100 p-3 rounded-md flex items-center space-x-5 ">
                    <p className="text-xs text-red-700 mb-1 flex items-center font-medium ">
                      <X /> Text Failed
                    </p>
                    {/* Show attempts remaining if available */}
                    {licenseData.attempts_remaining && (
                      <p className="text-xs text-gray-500">
                        Attempts remaining: {licenseData.attempts_remaining}
                      </p>
                    )}
                  </div>
                  <div className="bg-gray-100 p-3 rounded-md mt-2">
                    <p className="text-xs text-gray-700 mb-1 flex gap-3">
                      Application ID: {licenseData.application_id}
                      <span>
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(
                              licenseData.application_id
                            )
                          }
                          className="text-xs text-blue-500 hover:underline"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </span>
                    </p>

                    <p className="text-xs text-gray-500 flex gap-3">
                      Password: {licenseData.test_password}
                      <span>
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(
                              licenseData.test_password
                            )
                          }
                          className="text-xs text-blue-500 hover:underline"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </span>
                    </p>
                    <a
                      href={licenseData.test_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline mt-1 inline-block"
                    >
                      Test Link: {licenseData.test_link}
                    </a>
                  </div>
                </div>
              )}

              {/* Show test link if test is failed and not passed and if passed dont show test link*/}

              {((isCurrentStep(4) || isStepCompleted(4)) &&
                licenseData.test_link &&
                licenseData.status === 'test_failed') ||
                (licenseData.status === 'test_pending' && (
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-xs text-gray-700 mb-1 flex gap-3">
                      Application ID: {licenseData.application_id}
                      <span>
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(
                              licenseData.application_id
                            )
                          }
                          className="text-xs text-blue-500 hover:underline"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 flex gap-3">
                      Password: {licenseData.test_password}
                      <span>
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(
                              licenseData.test_password
                            )
                          }
                          className="text-xs text-blue-500 hover:underline"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </span>
                    </p>

                    <a
                      href={licenseData.test_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline mt-1 inline-block"
                    >
                      Test Link: {licenseData.test_link}
                    </a>
                  </div>
                ))}

              {licenseData.attempts_remaining > 3 && (
                <div className="bg-gray-100 p-3 rounded-md flex items-center space-x-5 ">
                  <p className="text-xs text-red-700 mb-1 flex items-center font-medium ">
                    <X /> Text Failed
                  </p>

                  {/* Show attempts remaining if available */}
                  {licenseData.attempts_remaining && (
                    <p className="text-xs text-gray-500">
                      Attempts remaining: {licenseData.attempts_remaining}
                    </p>
                  )}
                </div>
              )}

              {licenseData.status === 'test_passed' && (
                <div className="flex items-center  bg-gray-100 py-2 px-2 rounded-lg">
                  <Check className="w-4 h-4 text-blue-500 mr-1.5" />
                  <p className="text-xs text-blue-500">Test Passed</p>
                  {licenseData.test_passed_at && (
                    <p className="text-xs text-gray-500 ml-2">
                      {formatDate(licenseData.test_passed_at)}
                    </p>
                  )}
                </div>
              )}

              {/* Show test result */}
              {licenseData.status === 'test_passed' ||
                (licenseData.status === 'license_ready' && (
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-blue-500 mr-1.5" />
                    <p className="text-xs text-blue-500">Test Passed</p>
                    {licenseData.test_passed_at && (
                      <p className="text-xs text-gray-500 ml-2">
                        {formatDate(licenseData.test_passed_at)}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Step 5: Download Learning License */}
          <div className="flex items-start">
            <div className="flex flex-col items-center mr-4">
              <div
                className={`w-6 h-6 ${
                  isStepCompleted(5) || isCurrentStep(5)
                    ? 'bg-black'
                    : 'bg-gray-300'
                } rounded-full flex items-center justify-center`}
              >
                {isStepCompleted(5) ? (
                  <Check className="w-3.5 h-3.5 text-white" />
                ) : isCurrentStep(5) ? (
                  <Clock className="w-3.5 h-3.5 text-white" />
                ) : null}
              </div>
            </div>
            <div className="pt-0.5 space-y-2">
              <p className="text-sm text-gray-800">Download Learning License</p>
              {licenseData.license_download_link && (
                <a
                  href={licenseData.license_download_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white text-xs px-4 py-1.5 rounded-lg flex items-center w-fit"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Download LL
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Validity Notice - Show only when license is ready */}
        {licenseData.status === 'license_ready' && (
          <div className="mt-6 bg-black text-white p-4 rounded-md text-sm max-w-4xl mx-auto">
            <p>
              Your Learning License is valid for 6 months from the date of
              issue. You can give permanent license test anytime within this
              period.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

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
