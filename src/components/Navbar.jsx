import React, { useEffect, useState } from 'react';

import { CiHeart } from 'react-icons/ci';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOpenWishlist } from '../redux/slices/wishlistSlice';
import { useNavigate } from 'react-router-dom';
import { IoNotifications } from 'react-icons/io5';
import { toggleOpenNotification } from '../redux/slices/notificationSlice';
import Notification from './Notification';
import { toggleOpenUserLogin } from '../redux/slices/userSlice';
import { getToken } from '../../utils/constants';
import toast from 'react-hot-toast';

import ahenLogo from '../assets/images/ahenLogo.png';

import AvatarPlaceHolder from '../assets/images/AvatarPlaceHolder.png';
import {
  LocationSelectionModal,
  useLocationManager,
} from './LocationSelectionModal';

const Navbar = () => {
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getToken();

  const isNotificationOpen = useSelector(
    (state) => state.notification.isNotificationOpen
  );

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      fetchProfile(storedUserId);
    }
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const response = await fetch(
        `https://driving.shellcode.cloud/api/users/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );
      const data = await response.json();

      if (data.user) {
        setUser(data.user.photo);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      toast.error('Error fetching profile data.');
    }
  };

  const handleOpenWishlist = () => {
    dispatch(toggleOpenWishlist(true));
  };

  const openNotificationHandler = () => {
    dispatch(toggleOpenNotification(true));
  };
  const openLoginHandler = () => {
    dispatch(toggleOpenUserLogin(true));
  };
  const closeNotificationHandler = () => {
    dispatch(toggleOpenNotification(false));
  };

  const logoutHandler = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    setUser(null); // Reset state
    navigate('/');
  };

  const proceedToBooking = () => {
    // You can add a check to ensure location is set before booking
    openLocationModal();
  };

  const {
    isLocationModalOpen,
    openLocationModal,
    closeLocationModal,
    handleLocationSelect,
    LocationSelectionModal,
  } = useLocationManager();

  return (
    <>
      <div className="bg-[#F3F4F6] relative z-50 shadow-md px-4 py-4 flex items-center justify-between sm:px-12 md:px-24 select-none">
        <div className="flex items-center gap-4 sm:gap-12">
          <div
            className=" px-4 py-2 flex items-center  text-black font-semibold rounded-md text-2xl sm:text-base cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img alt="logo" src={ahenLogo} className="h-10 w-10" />
            <p className="text-2xl font-light">hen</p>
          </div>
          {token && (
            <div className="flex flex-col items-start ">
              <p className="text-[#808080] text-xs uppercase">Location</p>
              <div className="text-sm flex items-center gap-2">
                {/* /  <p className="m-0">{location.city} {location.town}</p> */}
                <button onClick={proceedToBooking}>Fetch Location</button>
              </div>
            </div>
          )}
        </div>
        <LocationSelectionModal
          isOpen={isLocationModalOpen}
          onClose={closeLocationModal}
          onLocationSelect={handleLocationSelect}
        />

        <div className="flex items-center gap-3 md:gap-5 text-lg md:text-xl">
          {token && (
            <>
              <CiHeart
                className="text-xl md:text-2xl cursor-pointer"
                onClick={handleOpenWishlist}
              />
              <div className="relative">
                {isNotificationOpen ? (
                  <IoNotifications
                    className="text-xl md:text-xl cursor-pointer"
                    onClick={closeNotificationHandler}
                  />
                ) : (
                  <IoNotificationsOutline
                    className="text-xl md:text-xl cursor-pointer"
                    onClick={openNotificationHandler}
                  />
                )}
                {isNotificationOpen && <Notification />}
              </div>
            </>
          )}

          {token ? (
            <div className="relative">
              <img
                alt="profile"
                src={AvatarPlaceHolder}
                className="h-7 w-7 rounded-md border-2 border-gray-300 cursor-pointer"
                onClick={() => setIsBoxOpen(!isBoxOpen)} // Toggle dropdown visibility
              />

              {isBoxOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg p-4 w-48 z-50 border rounded-md">
                  <div
                    className="mt-2 cursor-pointer"
                    onClick={() => navigate('/profile')}
                  >
                    <div className="text-sm font-semibold">Profile</div>
                  </div>
                  <div
                    className="mt-2 cursor-pointer"
                    onClick={() => navigate('/courses')}
                  >
                    <div className="text-sm font-semibold">Courses</div>
                  </div>

                  <div
                    className="mt-2 cursor-pointer"
                    onClick={() => navigate('/learning-license')}
                  >
                    <div className="text-sm font-semibold">License</div>
                    <div className="text-xs text-gray-500">
                      Learning License
                    </div>
                  </div>
                  <div
                    className="mt-2 cursor-pointer"
                    onClick={() => navigate('/driving-license')}
                  >
                    <div className="text-sm font-semibold">License</div>
                    <div className="text-xs text-gray-500">Driving License</div>
                  </div>
                  <div
                    className="mt-2 cursor-pointer"
                    onClick={() => navigate('/license-progress')}
                  >
                    <div className="text-sm font-semibold">
                      License Progress
                    </div>
                    <div className="text-xs text-gray-500">
                      License Progress
                    </div>
                  </div>

                  <div
                    className="mt-2 cursor-pointer"
                    onClick={() => navigate('/bookings')}
                  >
                    <div className="text-sm font-semibold">Bookings</div>
                  </div>
                  <div
                    className="mt-2 cursor-pointer"
                    onClick={() => navigate('/practice-driving')}
                  >
                    <div className="text-sm font-semibold">
                      Practice Driving
                    </div>
                  </div>
                  <div className="mt-2 cursor-pointer" onClick={logoutHandler}>
                    <div className="text-sm font-semibold">Logout</div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm cursor-pointer" onClick={openLoginHandler}>
              Login
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
