import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CarPlaceHolder from '../../assets/images/CarPlaceHolder.png';

const CarCardGrid = ({ cars, currentImageIndex, handleImageClick }) => {
  const navigate = useNavigate();
  const practiceDrivingSearchText = useSelector(
    (state) => state.practiceDriving.practiceDrivingSearchText
  );

  if (!cars || cars.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No cars available for this category.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {(practiceDrivingSearchText
        ? cars.filter((car) =>
            car.name
              .toLowerCase()
              .includes(practiceDrivingSearchText.toLowerCase())
          )
        : cars
      ).map((car, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4">
          <div className="relative w-full rounded-lg overflow-hidden">
            <img
              src={car.images[currentImageIndex[car.name]] || CarPlaceHolder}
              alt={car.name}
              className="w-full h-40 object-cover"
              onClick={() => {
                const nextIndex = (currentImageIndex[car.name] || 0) + 1;
                const newIndex = nextIndex >= car.images.length ? 0 : nextIndex;
                handleImageClick(car.name, newIndex);
              }}
            />
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {car.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex[car.name] === index
                      ? 'bg-black'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <div
            className="cursor-pointer mt-4"
            onClick={() =>
              navigate(`/practice-driving/${car.name.replace(' ', '-')}`, {
                state: { car },
              })
            }
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{car.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <FaStar className="text-yellow-400" />
                <span className="text-sm">{car.rating}</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              <span className="font-bold text-lg text-black">{car.price}</span>
              /hour
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarCardGrid;
