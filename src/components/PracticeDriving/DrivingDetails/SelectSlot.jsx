import React, { useEffect, useMemo, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SelectSlot = ({ handleClose, car }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(1); // Default duration is 1 hour

  const [user, setUser] = useState(null);

  console.log('USer ', user);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');

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
          console.error('Error fetching profile data:', error);
          toast.error('Error fetching profile data.');
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
        label: nextDate.toLocaleDateString('en-US', { weekday: 'short' }),
        date: nextDate,
      };
    });
  }, []);

  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '01:00 PM - 03:00 PM',
    '03:00 PM - 05:00 PM',
    '05:00 PM - 07:00 PM',
  ];

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createSession = async (slotDate) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      const requestBody = {
        practisedrivingid: car.id,
        booking_date: new Date().toISOString().split('T')[0],
        slot_date: slotDate,
        slot_time: selectedTimeSlot,
        status: 'pending',
        amount: car.price.replace('₹', '') * selectedDuration,
        hours: selectedDuration,
        mobile_number: user.phone_number,
      };

      const apiEndpoint = 'https://driving.shellcode.cloud/api/create-booking';
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data) {
        toast.success('Session booked successfully! 🎉');
        navigate('/bookings');
      } else {
        toast.error(
          data.message || 'Failed to book session. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error creating session:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const initializeRazorpay = async (amount, description, slotDate) => {
    if (!user?.phone_number) {
      toast.error('Please update your profile with a valid phone number.');
      return;
    }

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Failed to load Razorpay. Please try again.');
        return;
      }

      const response = await fetch(
        'https://driving.shellcode.cloud/api/payments/create-order',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount,
            currency: 'INR',
            receipt: `booking_receipt_${Date.now()}`,
          }),
        }
      );

      const { order, success } = await response.json();
      if (!success) {
        toast.error('Failed to create Razorpay order. Please try again.');
        return;
      }

      const options = {
        key: 'rzp_test_3sEAtEoClhTs62',
        amount: order.amount,
        currency: 'INR',
        name: car.name,
        description,
        order_id: order.id,
        handler: async () => {
          toast.success('Payment successful! Proceeding to book session...');
          await createSession(slotDate);
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: `+91${user.phone_number}`,
        },
        theme: { color: '#3399cc' },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on('payment.failed', (error) => {
        console.error('Payment failed:', error);
        toast.error('Payment failed. Please try again.');
      });

      razorpay.open();
    } catch (error) {
      console.error('Error initializing Razorpay:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const handleBooking = () => {
    if (selectedDay !== null && selectedTimeSlot) {
      const selectedDayObj = days.find((day) => day.id === selectedDay);
      const slotDate = selectedDayObj
        ? selectedDayObj.date.toISOString().split('T')[0]
        : '';

      const baseAmount = Number(car.price.replace('₹', ''));
      const totalAmount = baseAmount; // Razorpay requires amount in paise

      initializeRazorpay(
        totalAmount,
        `Booking for ${car.name} (${selectedDuration} hours)`,
        slotDate
      );
    } else {
      toast.error('Please select a day and time slot before proceeding.');
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        onClick={() => handleClose(false)}
      ></div>

      <div className="absolute z-50 left-1/2 top-2/4 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] sm:w-[600px] rounded-lg shadow-lg">
        <div className="w-full bg-white rounded-lg shadow-md p-6 relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={() => handleClose(false)}
          >
            <AiOutlineClose size={20} />
          </button>

          <h2 className="text-center text-xl sm:text-2xl font-semibold mb-6">
            Select Slot
          </h2>

          {/* Day Selection */}
          <div className="mb-4">
            <h3 className="font-medium text-sm sm:text-base mb-2">Day</h3>
            <div className="flex flex-wrap justify-between gap-3">
              {days.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`flex flex-col justify-center items-center w-16 h-16 sm:w-20 sm:h-20 border rounded-lg transition-colors duration-200 ${
                    selectedDay === day.id
                      ? 'bg-black text-white'
                      : 'text-gray-700 border-gray-300'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{day.label}</span>
                  <span className="font-medium text-xl">
                    {day.date.getDate()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2 text-sm sm:text-base">
              Duration (hours)
            </h3>
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((hour) => (
                <button
                  key={hour}
                  onClick={() => setSelectedDuration(hour)}
                  className={`px-3 py-2 border rounded-lg text-sm sm:text-base transition-colors duration-200 ${
                    selectedDuration === hour
                      ? 'bg-black text-white'
                      : 'text-gray-700 border-gray-300'
                  }`}
                >
                  {hour} Hour{hour > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot Selection */}
          <div className="mb-4">
            <h3 className="font-medium mb-2 text-sm sm:text-base">Time Slot</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`px-2 py-1 border rounded-lg text-xs sm:text-sm transition-colors duration-200 ${
                    selectedTimeSlot === slot
                      ? 'bg-black text-white'
                      : 'text-gray-700 border-gray-300'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selection */}

          {/* Confirm Booking Button */}
          <div className="mt-6 sm:mt-12 flex justify-end">
            <button
              className="px-3 py-2 bg-black text-white rounded-lg text-sm sm:text-base"
              onClick={handleBooking}
              disabled={selectedDay === null || !selectedTimeSlot}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSlot;
