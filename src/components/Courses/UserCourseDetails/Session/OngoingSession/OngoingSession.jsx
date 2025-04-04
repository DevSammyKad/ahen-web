import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Breadcrumb from "../../../../Breadcrumb";
import Navbar from "../../../../Navbar";
import { CiCalendar } from "react-icons/ci";
import { BsArrowRight } from "react-icons/bs";
import EndSession from "../EndSession";
import StartSession from "../StartSession";
import OngoingSessionContent from "./OngoingSessionContent";
import RateInstructor from "../../../../RateInstructor";
import { useNavigate } from "react-router-dom";
import { toggleOpenRateInstructor } from "../../../../../redux/slices/sessionSlice";
import { useDispatch, useSelector } from "react-redux";

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem',
};

const Map = ({ isBlurred }) => {
  const [position, setPosition] = useState({ lat: 18.5204, lng: 73.8567 }); // Default to Pune, India
  const [isLoaded, setIsLoaded] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Geolocation error:", error);
          // Keep default Pune location if geolocation fails
        }
      );
    }
  }, []);

  return (
    <div className={`relative transition-all duration-300 ${isBlurred ? 'filter blur-sm z-0' : 'z-10'}`}>
      {!isLoaded && (
        <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
          <p>Loading map...</p>
        </div>
      )}
      
      <LoadScript 
        googleMapsApiKey=""
        onLoad={() => setIsLoaded(true)}
        onError={() => console.log("Error loading Google Maps")}
      >
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={13}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false
            }}
          >
            <Marker position={position} />
          </GoogleMap>
        )}
      </LoadScript>
      
      {isBlurred && (
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg" />
      )}
    </div>
  );
};

const OngoingSession = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isRateInstructorOpen = useSelector(
    (state) => state.session.isRateInstructorOpen
  );

  const handlenavigate = () => {
    dispatch(toggleOpenRateInstructor(true));
  };

  return (
    <div className="relative bg-[#F3F4F6] pb-20">
      <Navbar />
      <div className="px-4 sm:px-10 lg:px-24">
        <Breadcrumb />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
          <div className="md:col-span-1 col-span-2">
            <Map isBlurred={isRateInstructorOpen} />
            
            <div className={`flex items-center justify-end mt-6 ${isRateInstructorOpen ? 'filter blur-sm' : ''}`}>
              <button
                className="bg-black text-white flex items-center gap-2 px-4 py-3 rounded-lg"
                onClick={handlenavigate}
              >
                <CiCalendar className="text-xl" />
                <p className="text-sm">End Session</p>
                <BsArrowRight className="text-lg font-light ml-5" />
              </button>
            </div>
          </div>
          <div className={`pl-2 md:col-span-1 col-span-2 ${isRateInstructorOpen ? 'filter blur-sm' : ''}`}>
            <OngoingSessionContent />
          </div>
        </div>
      </div>
      
      <StartSession />
      <EndSession />
      <RateInstructor />
    </div>
  );
};

export default OngoingSession;