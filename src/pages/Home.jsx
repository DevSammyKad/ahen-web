import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

import CourseBanner from '../components/Home/CourseBanner';
import DiscountBanner from '../components/Home/DiscountBanner';
import HomeCards from '../components/Home/HomeCards';
import CourseCards from './../components/Home/CourseCards';
import { getToken } from '../../utils/constants';

const Home = () => {
  const [upcomingSession, setUpcomingSession] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchUpcomingSession = async () => {
    try {
      const token = await getToken();

      const res = await fetch(
        'https://driving.shellcode.cloud/api/upcoming-sessions',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Use token directly
          },
          credentials: 'include',
        }
      );

      if (!res.ok) {
        console.error(
          `Failed to fetch session: ${res.status} - ${res.statusText}`
        );
        return;
      }

      const data = await res.json();
      console.log('Data:', data.session);

      setUpcomingSession(data.session);

      setMessage('No session available');
    } catch (error) {
      console.error('Error occurred while fetching session:', error);
    }
  };

  // console.log('Upcoming Session:', upcomingSession);

  useEffect(() => {
    fetchUpcomingSession();
  }, []);

  return (
    <div className="bg-[#F3F4F6] pb-20">
      <Navbar />
      {<CourseBanner upcomingSession={upcomingSession} message={message} />}
      <div className="px-4 sm:px-10 lg:px-24 py-6 ">
        <HomeCards />
      </div>
      <div className="px-4 sm:px-10 lg:px-24 py-8 ">
        <DiscountBanner />
      </div>
      <div className="px-4 sm:px-10 lg:px-24 py-4 ">
        <CourseCards />
      </div>
    </div>
  );
};

export default Home;
