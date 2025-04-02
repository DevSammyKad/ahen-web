import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import CarCardGrid from '../components/PracticeDriving/CarCardGrid';
import SearchBar from '../components/PracticeDriving/SearchBar';
import Tabs from '../components/PracticeDriving/Tabs';

const PracticeDriving = () => {
  const [selectedTab, setSelectedTab] = useState('hatchback');
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [cars, setCars] = useState({ hatchback: [], sedan: [], suv: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const tabs = ['hatchback', 'sedan', 'suv'];

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          'https://driving.shellcode.cloud/practise-driving/all'
        );
        const data = await response.json();

        console.log('Practice Data ', data);

        if (data.message) {
          const categorizedCars = { hatchback: [], sedan: [], suv: [] };
          data.data.forEach((car) => {
            const normalizedType = car.type.toLowerCase();
            if (categorizedCars[normalizedType]) {
              categorizedCars[normalizedType].push({
                id: car.id,
                name: car.carname,
                brand: car.carbrand,
                price: '₹' + (car.price || '400'),
                images: [car.image],
                rating: car.starRating,
                about: {
                  description:
                    car.about?.description || 'No description available',
                  ownerName: car.about?.owner_name || 'Unknown',
                  ownerImage: car.about?.image || '',
                },
                reviews:
                  car.reviews?.map((review) => ({
                    user: review.user,
                    text: review.text,
                    starRating: review.starRating,
                    createdAt: new Date(review.createdAt).toLocaleDateString(),
                  })) || [],
              });
            }
          });

          // Clear the existing state to avoid accumulation
          setCars(categorizedCars);
        } else {
          setError('Failed to fetch data.');
        }
      } catch (error) {
        setError('An error occurred while fetching the data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []); // Fetch data only once on mount

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageClick = (carName, index) => {
    setCurrentImageIndex((prev) => ({ ...prev, [carName]: index }));
  };

  return (
    <div className="bg-[#F3F4F6] pb-20 min-h-screen">
      <Navbar />
      <div className="px-4 sm:px-6">
        <Breadcrumb />
        <div className="my-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-xl font-bold">Practice Driving</h1>
          <SearchBar />
        </div>
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <div className="mt-6">
          <CarCardGrid
            cars={cars[selectedTab]}
            currentImageIndex={currentImageIndex}
            handleImageClick={handleImageClick}
          />
        </div>
      </div>
    </div>
  );
};

export default PracticeDriving;
