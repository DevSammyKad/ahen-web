import React from 'react';
import CarPlaceHolder from '../../../assets/images/CarPlaceHolder.png';

const CarImage = ({ car, image }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img
      alt={car?.name}
      src={image || CarPlaceHolder}
      className="w-full h-64 object-cover"
    />
  </div>
);

export default CarImage;
