import React, { useState } from 'react';
import cardImage1 from '../../assets/images/homeCardImage.png';
import cardImage2 from '../../assets/images/practiceDriving.png';
import cardImage3 from '../../assets/images/License.png';
import { useNavigate } from 'react-router-dom';

const HomeCards = () => {
  const [showLicenseOptions, setShowLicenseOptions] = useState(false);
  const data = [
    {
      id: '1',
      title: 'Driving Zero to Hero',
      des: 'Learn driving right from basics & become a Master.',
      image: cardImage1,
      route: '/courses',
    },
    {
      id: '2',
      title: 'Licensing',
      des: 'Get your driving license at the comfort of your home.',
      image: cardImage3,
      route: '/driving-license',
    },
    {
      id: '3',
      title: 'Practice driving',
      des: 'Get hands on experience on a vehicle & sharpen your skills.',
      image: cardImage2,
      route: '/practice-driving',
    },
  ];

  const navigate = useNavigate();

  const handleCardClick = (id, route) => {
    if (id === '2') {
      setShowLicenseOptions(!showLicenseOptions);
    } else {
      navigate(route);
    }
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center items-center relative">
      {data.map((info) => (
        <div
          className="w-full sm:w-[256px] bg-white py-10 md:py-20 px-4 shadow-lg rounded-xl flex flex-col items-center justify-center text-center hover:scale-105 transition-transform relative"
          key={info.id}
          onClick={() => handleCardClick(info.id, info.route)}
        >
          <div>
            <img alt={info.title} src={info.image} className="w-full h-32" />
          </div>
          <p className="text-lg font-bold mt-6">{info.title}</p>
          <p className="text-sm text-[#959595] mt-2">{info.des}</p>

          {/* Show dropdown only for Licensing card */}
          {info.id === '2' && showLicenseOptions && (
            <div className="absolute top-[20%] mt-2 bg-white shadow-md rounded-md py-2 z-50 w-48">
              <div className="flex flex-col items-center gap-2">
                <p
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate('/driving-license')}
                >
                  Driving License
                </p>
                <p
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate('/learning-license')}
                >
                  Learning License
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomeCards;
