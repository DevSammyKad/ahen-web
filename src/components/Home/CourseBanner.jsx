import React from 'react';

import bg from '../../assets/images/bannerBg.png';

const CourseBanner = ({ upcomingSession, message }) => {
  // const {
  //   booking_id,
  //   slot_date,
  //   slot_time,
  //   amount,
  //   session_type,
  //   image,
  //   title,
  //   booking_status,
  // } = upcomingSession;

  // console.log(upcomingSession);
  return (
    <div className="px-6 sm:px-12 md:px-24 py-8">
      <div>
        <p className="font-normal text-sm sm:text-base md:text-lg text-black">
          Upcoming Session
        </p>
        {upcomingSession ? (
          <div
            className="bg-black px-4 sm:px-5 py-3 sm:py-4 rounded-lg mt-4 text-white bg-opacity-80"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold">
              {upcomingSession.session_title}
            </p>
            <p className="text-xs sm:text-sm mt-2">
              Practice Session: {upcomingSession.session_id}
            </p>

            <div className="mt-4 md:mt-5 flex justify-end">
              <button className="bg-white text-black text-sm md:text-base rounded-md px-4 md:px-3 py-2 md:py-1 font-medium">
                Start Session
              </button>
            </div>
          </div>
        ) : (
          <p className="text-black">{`No upcoming session`}</p>
        )}
      </div>
      <hr className="mt-5 h-[2px] bg-[#C9C9C9] border-0" />
    </div>
  );
};

export default CourseBanner;
