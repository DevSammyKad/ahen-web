import React, { useState, useMemo, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleOpenSessionBooking } from "../../../../redux/slices/sessionSlice";
import toast from "react-hot-toast";

import drivingImg from "../../../../assets/images/drivingLessons.png";
import { useNavigate } from "react-router-dom";

const SessionBooking = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isFinalView, setIsFinalView] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClose = () => dispatch(toggleOpenSessionBooking(false));

  const session = useSelector((state) => state.session.session);
  const course = useSelector((state) => state.session.course);
  const { sessionType, paymentType } = course;

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");

    if (storedUserId) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            `https://driving.shellcode.cloud/api/users/users/${storedUserId}`
          );
          const data = await response.json();
          if (data?.user) {
            setUser(data.user);
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
          toast.error("Error fetching profile data.");
        }
      };

      fetchProfile();
    }
  }, []);

  const days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + i + 1);
      return {
        id: i,
        label: nextDate.toLocaleDateString("en-US", { weekday: "short" }),
        date: nextDate.getDate().toString().padStart(2, "0"), // Ensure 2-digit format
      };
    });
  }, []);

  // Available time slots
  const timeSlots = [
    "09:00 AM - 11:00 AM",
    "11:00 AM - 01:00 PM",
    "01:00 PM - 03:00 PM",
    "03:00 PM - 05:00 PM",
    "05:00 PM - 07:00 PM",
  ];

  // Function to create a session
  const createSession = async () => {
    try {
      const tokenData = JSON.parse(localStorage.getItem("token"));

      // Determine API endpoint
      const apiEndpoint =
        "https://driving.shellcode.cloud/api/createOneToOneSession";

      // Ensure selectedDay is valid
      const selectedDayObj = days.find((day) => day.id === selectedDay);
      if (!selectedDayObj) {
        toast.error("Please select a valid day.");
        return;
      }

      // Convert selected day to YYYY-MM-DD format
      const today = new Date();
      const slot_date = new Date(
        today.getFullYear(),
        today.getMonth(),
        parseInt(selectedDayObj.date, 10)
      )
        .toISOString()
        .split("T")[0];

      // Prepare the request body
      const requestBody = {
        course_id: course?.courseId,
        booking_date: new Date().toISOString().split("T")[0], // Current date
        slot_date, // Corrected to YYYY-MM-DD format
        slot_time: selectedTimeSlot, // User-selected time slot
        amount: 250, // Payment amount (if applicable)
        session_id: session?.sessionId,
        session_type: "one-to-one",
      };

      // Make API request
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.value}`,
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });

      const data = await response.json();

      if (data.bookingData) {
        toast.success("Session booked successfully! 🎉");
        setIsFinalView(true);
      } else {
        toast.error(
          data.message || "Failed to book session. Please try again."
        );
      }
    } catch (error) {
      console.error("Error creating session:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleConfirmBooking = () => {
    if (selectedDay !== null && selectedTimeSlot) {
      if (paymentType === "payonce") {
        createSession();
      } else if (paymentType === "paydaily") {
        initializeRazorpay(300, "Session Booking");
      }
    }
  };

  const initializeRazorpay = async (amount, description) => {
    if (!user.phone_number) {
      toast.error("Please update user profile");
      return;
    }
    try {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = async () => {
        const tokenData = localStorage.getItem("token");
        const { value } = JSON.parse(tokenData);
        const response = await fetch(
          "https://driving.shellcode.cloud/api/payments/create-order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${value}`,
            },
            body: JSON.stringify({
              amount,
              currency: "INR",
              receipt: "receipt#1",
            }),
            credentials: "include",
          }
        );

        const data = await response.json();
        if (!data.success) {
          toast.error("Failed to create order. Please try again.");
          return;
        }

        const options = {
          key: "rzp_test_3sEAtEoClhTs62",
          amount: data.order.amount,
          currency: "INR",
          name: "Ahen",
          description,
          order_id: data.order.id,
          handler: async () => {
            toast.success("Payment successful! 🎉");
            await createSession();
          },
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: user?.phone_number,
          },
          theme: { color: "#3399cc" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.on("payment.failed", () =>
          toast.error("Payment failed. Please try again.")
        );
        razorpay.open();
      };
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  if (isFinalView) {
    return (
      <div>
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={handleClose}></div>

        <div className="absolute z-50 w-[90%] sm:w-[550px] left-1/2 top-2/4 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg">
          <div className="flex flex-col items-center w-full bg-white rounded-lg shadow-md p-6 sm:p-8 text-center relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={handleClose}>
              <AiOutlineClose size={20} />
            </button>
            <img
              alt="driving"
              src={drivingImg}
              className="w-full max-w-xs mx-auto"
            />
            <h2 className="text-lg font-semibold mt-4">
              Booking Confirmation!
            </h2>
            <p className="text-xs text-[#797979]">
              Fasten your seat belts, your session is scheduled!
            </p>
            <div className="text-sm font-medium mt-4 flex justify-center items-center gap-2">
              <p>{days.find((day) => day.id === selectedDay)?.label}</p>
              <p>{days.find((day) => day.id === selectedDay)?.date},</p>
            </div>
            <p className="text-sm font-medium">{selectedTimeSlot}</p>

            <button
              className="mt-4 text-sm px-8 py-2 bg-black text-white rounded-lg"
              onClick={() => navigate("/bookings")}>
              My Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        onClick={() => dispatch(toggleOpenSessionBooking(false))}></div>
      <div className="absolute z-50 w-[90%] sm:w-[600px] left-1/2 top-2/4 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg">
        <div className="w-full bg-white rounded-lg shadow-md p-6 sm:p-8 relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={() => dispatch(toggleOpenSessionBooking(false))}>
            <AiOutlineClose size={20} />
          </button>
          <h2 className="text-center text-xl font-semibold mb-6">
            Book Session
          </h2>

          {/* Day Selection */}
          <div className="mb-4">
            <h3 className="font-medium text-sm mb-2">Day</h3>
            <div className="flex flex-wrap justify-between">
              {days.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`px-4 py-2 border rounded-lg text-sm mb-2 ${
                    selectedDay === day.id
                      ? "bg-black text-white"
                      : "border-gray-300 text-gray-700"
                  }`}>
                  <span>{day.label}</span>
                  <span className="block text-xs">{day.date}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-2 text-sm">Time Slot</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`px-4 py-2 border rounded-lg text-sm ${
                    selectedTimeSlot === slot
                      ? "bg-black text-white"
                      : "text-gray-700 border-gray-300"
                  }`}>
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Confirm Button */}
          <div className="mt-6 flex justify-end">
            {!isFinalView && (
              <button
                className="px-4 bg-black text-white py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedDay === null || !selectedTimeSlot}
                onClick={handleConfirmBooking}>
                {paymentType === "paydaily"
                  ? "Pay Rs 300 & Confirm"
                  : "Confirm Booking"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionBooking;
