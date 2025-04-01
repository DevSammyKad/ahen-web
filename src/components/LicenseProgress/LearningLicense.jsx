import React from 'react';

const LicenseProgressCard = ({ data }) => {
  if (!data) return <p>Loading...</p>;

  return (
    <div className="border rounded-lg shadow-lg p-4 w-full max-w-md bg-white">
      <h2 className="text-lg font-semibold text-gray-700">License Progress</h2>
      <p className="text-gray-500">Step: {data.current_step}</p>
      <p className="text-gray-500">
        Status: <span className="font-bold">{data.status}</span>
      </p>

      {data.attempts_remaining && (
        <p className="text-gray-500">
          Attempts Remaining: {data.attempts_remaining}
        </p>
      )}
      {data.application_id && (
        <p className="text-gray-500">Application ID: {data.application_id}</p>
      )}
      {data.test_password && (
        <p className="text-gray-500">Test Password: {data.test_password}</p>
      )}
      {data.test_link && (
        <p className="text-blue-500 underline">
          <a href={data.test_link} target="_blank" rel="noopener noreferrer">
            Take Test
          </a>
        </p>
      )}
      {data.test_passed_at && (
        <p className="text-green-500">Test Passed At: {data.test_passed_at}</p>
      )}
      {data.license_download_link && (
        <p className="text-blue-500 underline">
          <a
            href={data.license_download_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download License
          </a>
        </p>
      )}
    </div>
  );
};

export default LicenseProgressCard;
