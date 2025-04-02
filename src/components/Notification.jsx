import React, { useEffect, useState } from "react";
import notificationImage from "../assets/images/notification.png";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = localStorage.getItem("user_id"); // Get user_id from local storage
      if (userId) {
        try {
          const response = await fetch(
            `https://driving.shellcode.cloud/api/notifications/${userId}`
          );
          const data = await response.json();
          setNotifications(data); // Assuming data is an array of notifications
        } catch (error) {
          console.error("Error fetching notifications:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-[24px] right-[-3px] w-0 h-0 border-l-[13px] border-l-transparent border-r-[13px] border-r-transparent border-b-[20px] border-b-white"></div>
      <div className="absolute top-[40px] bg-white shadow-lg p-4 w-[300px] md:w-[450px] right-[-30px] rounded-lg">
        <p className="text-sm font-semibold">Notifications</p>
        {loading ? (
          <p>Loading...</p>
        ) : notifications.length > 0 ? (
          <div className="py-5 max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-center gap-4 mb-3 border-b-2 pb-2">
                <img
                  alt={notification.title}
                  src={notification.image || "https://placehold.co/100"} // Fallback image
                  className="w-16 h-16 rounded-md"
                />
                <div>
                  <p className="text-sm font-semibold">{notification.title}</p>
                  <p className="text-xs">{notification.description}</p>
                  <p className="text-xs mt-2">{notification.day}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center md:px-14 px-4 pt-5 md:pb-10 pb-4">
            <img
              alt="notification"
              src={notificationImage}
              className="h-36 w-32"
            />
            <p className="text-sm">No Notifications!</p>
            <p className="text-xs mt-2 text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
              eiusmod tempor
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
