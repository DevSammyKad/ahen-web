import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import CarPlaceHolder from '../assets/images/CarPlaceHolder.png';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showPopup, setShowPopup] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    // Fetch bookings data
    const fetchBookings = async () => {
      try {
        const user_id = localStorage.getItem('user_id');
        if (!user_id) {
          console.error('User ID not found in localStorage');
          return;
        }

        const response = await fetch(
          `https://driving.shellcode.cloud/api/bookings/user/${user_id}`
        );
        const data = await response.json();

        if (data.bookings?.length > 0) {
          setBookings(data.bookings);
        } else {
          console.error('Failed to fetch bookings:', data.message);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = (id) => {
    setBookingId(id);
    setShowPopup(true);
  };

  const handleConfirmCancel = async () => {
    try {
      const response = await fetch(
        'https://driving.shellcode.cloud/api/update-cancel-booking',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            booking_id: bookingId,
            new_status: 'rejected',
          }),
        }
      );

      if (response.ok) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking.booking_id === bookingId
              ? { ...booking, status: 'rejected' }
              : booking
          )
        );
        setShowPopup(false);
      } else {
        console.error('Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const filteredBookings =
    filter === 'All'
      ? bookings
      : bookings.filter(
          (booking) => booking.status.toLowerCase() === filter.toLowerCase()
        );

  return (
    <div className="bg-[#F3F4F6] pb-20 h-auto">
      <Navbar />
      <div className="px-4 sm:px-10 lg:px-24">
        <Breadcrumb />
        <div className="my-5 flex justify-between items-center">
          <p className="text-xl">Bookings</p>
        </div>
        {/* Filter Buttons - Wrap to Next Line on Mobile */}
        <div className="w-full flex flex-wrap gap-2 mb-4 md:justify-start justify-center">
          {['All', 'Completed', 'Pending', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm ${
                filter === status
                  ? 'bg-black text-white'
                  : 'bg-transparent text-black border border-black'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {filteredBookings?.length === 0 ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-500 text-sm">No bookings available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((booking) => (
              <div key={booking.id}>
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                  <div className="flex items-start mb-4 border-b pb-4">
                    <img
                      src={booking.image || CarPlaceHolder}
                      alt="Car"
                      className="rounded-md w-28 h-20 object-cover mr-4"
                    />
                    <div className="pt-4">
                      <h2 className="text-base font-bold mb-1">
                        {booking.title}
                      </h2>
                      <p className="text-gray-500 text-xs">
                        {booking.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs space-y-1 border-b pb-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Booking Date</span>
                      <span>
                        {new Date(booking.booking_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Booking ID</span>
                      <span>{booking.booking_id || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Slot Date</span>
                      <span>
                        {new Date(booking.slot_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Slot Time</span>
                      <span>{booking.slot_time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Status</span>
                      <span
                        className={`${
                          booking.status === 'pending'
                            ? 'text-yellow-500'
                            : booking.status === 'completed'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        {(booking.status === 'pending' && 'Upcoming') ||
                          (booking.status === 'rejected' && 'Cancelled') ||
                          (booking.status === 'completed' && 'Completed')}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1 text-xs border-b pb-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Amount</span>
                      <span>Rs {booking.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Tax & Fees</span>
                      <span>Rs 50</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm pt-1">
                    <span className="font-medium">Total Amount</span>
                    <span>Rs {Number(booking.amount) + 50}</span>
                  </div>
                </div>
                {booking.status.toLowerCase() === 'pending' && (
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handleCancel(booking.booking_id)}
                      className="border border-black text-xs px-4 py-1 rounded-lg"
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md h-44 flex flex-col justify-center text-center">
            <p className="mb-4 font-bold text-xl">Cancel Booking?</p>
            <p className="mb-4">
              Are you sure you want to cancel your booking?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowPopup(false)}
                className="px-8 w-full py-2 bg-white text-black border border-black rounded-xl"
              >
                No
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-8 py-2 w-full bg-black text-white rounded-xl"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
