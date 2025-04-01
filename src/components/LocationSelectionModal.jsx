import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

// Location Selection Modal Component
export const LocationSelectionModal = ({
  isOpen,
  onClose,
  onLocationSelect,
}) => {
  const [locationType, setLocationType] = useState('current');
  const [locationData, setLocationData] = useState({
    flat_no: '',
    landmark: '',
    city: '',
    full_name: '',
    mobile_number: '',
  });

  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState('');

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          });
          setError('');
        },
        (err) => {
          setError('Failed to get location. Please enable location services.');
          console.error(err);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (locationType === 'current') {
      getCurrentLocation();
    }
  }, [locationType]);

  const handleAddAddress = async () => {
    const storedUserId = localStorage.getItem('user_id');

    if (!storedUserId) {
      toast.error('User ID not found. Please log in again.');
      return;
    }

    const tokenData = JSON.parse(localStorage.getItem('token'));
    const token = tokenData?.value;

    const payload = {
      user_id: storedUserId,
      latitude:
        locationType === 'current'
          ? currentLocation?.latitude || '22.9998592'
          : '22.9998592',
      longitude:
        locationType === 'current'
          ? currentLocation?.longitude || '72.5090304'
          : '72.5090304',
      flat_no: locationData.flat_no,
      landmark: locationData.landmark,
      city: locationData.city,
      full_name: locationData.full_name,
      mobile_number: locationData.mobile_number,
    };

    try {
      const response = await fetch(
        'https://driving.shellcode.cloud/api/add-address',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success('Location added successfully');
        onLocationSelect(payload);
        onClose();
      } else {
        toast.error(data.message || 'Failed to add location');
      }
    } catch (err) {
      console.error('Location add error:', err);
      toast.error('An error occurred while adding location');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Select Location</h2>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="current"
              checked={locationType === 'current'}
              onChange={() => setLocationType('current')}
              className="mr-2"
            />
            Use Current Location
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="manual"
              checked={locationType === 'manual'}
              onChange={() => setLocationType('manual')}
              className="mr-2"
            />
            Enter Manually
          </label>
        </div>

        {locationType === 'manual' && (
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={locationData.full_name}
              onChange={(e) =>
                setLocationData({ ...locationData, full_name: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={locationData.mobile_number}
              onChange={(e) =>
                setLocationData({
                  ...locationData,
                  mobile_number: e.target.value,
                })
              }
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Flat No."
              value={locationData.flat_no}
              onChange={(e) =>
                setLocationData({ ...locationData, flat_no: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Landmark"
              value={locationData.landmark}
              onChange={(e) =>
                setLocationData({ ...locationData, landmark: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="City"
              value={locationData.city}
              onChange={(e) =>
                setLocationData({ ...locationData, city: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            />
          </div>
        )}

        {locationType === 'current' && currentLocation && (
          <div className="text-sm text-gray-600 mb-4">
            <p>Latitude: {currentLocation.latitude}</p>
            <p>Longitude: {currentLocation.longitude}</p>
          </div>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleAddAddress}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Location
          </button>
        </div>
      </div>
    </div>
  );
};

// Redux Slice
export const locationSlice = {
  name: 'location',
  initialState: {
    currentLocation: null,
    addresses: [],
  },
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
  },
};

// Custom Hook for Location Management
export const useLocationManager = () => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const dispatch = useDispatch();

  const openLocationModal = () => setIsLocationModalOpen(true);
  const closeLocationModal = () => setIsLocationModalOpen(false);

  const handleLocationSelect = (location) => {
    dispatch({
      type: 'location/setCurrentLocation',
      payload: location,
    });
  };

  return {
    isLocationModalOpen,
    openLocationModal,
    closeLocationModal,
    handleLocationSelect,
    LocationSelectionModal,
  };
};
