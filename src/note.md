: drivingLicenseData.status === 'slot_booked' ? (

<div className="bg-gray-100 p-2 rounded-md mt-2">
<p className="text-xs">
Retest Slot Booked For{' '}
{formatDate(drivingLicenseData.slot_datetime) || 'N/A'}
</p>
</div>
)

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
