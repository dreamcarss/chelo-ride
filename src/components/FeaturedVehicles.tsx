
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VehicleCard, { VehicleData } from './VehicleCard';

// Sample data
const featuredVehicles: VehicleData[] = [
  {
    id: "1",
    name: "Lamborghini Huracan",
    image: "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    price: 899,
    category: "Exotic",
    seats: 2,
    fuelType: "Gasoline",
    year: 2023,
    transmission: "Automatic",
    topSpeed: 325,
    featured: true
  },
  {
    id: "2",
    name: "Ferrari 488 GTB",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    price: 949,
    category: "Exotic",
    seats: 2,
    fuelType: "Gasoline",
    year: 2022,
    transmission: "Automatic",
    topSpeed: 330,
    featured: true
  },
  {
    id: "3",
    name: "Aston Martin DB11",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    price: 799,
    category: "Sports",
    seats: 2,
    fuelType: "Gasoline",
    year: 2023,
    transmission: "Automatic",
    topSpeed: 322,
    featured: true
  },
  {
    id: "4",
    name: "Porsche 911 Turbo S",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    price: 699,
    category: "Sports",
    seats: 4,
    fuelType: "Gasoline",
    year: 2023,
    transmission: "Automatic",
    topSpeed: 320,
    featured: true
  },
  {
    id: "5",
    name: "Mercedes-AMG GT",
    image: "https://images.unsplash.com/photo-1617814076668-3880a77c985f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
    price: 599,
    category: "Sports",
    seats: 2,
    fuelType: "Gasoline",
    year: 2023,
    transmission: "Automatic",
    topSpeed: 315,
    featured: true
  },
  {
    id: "6",
    name: "Bentley Continental GT",
    image: "https://images.unsplash.com/photo-1642661358472-2a6a8e97c50a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    price: 799,
    category: "Luxury",
    seats: 4,
    fuelType: "Gasoline",
    year: 2023,
    transmission: "Automatic",
    topSpeed: 333,
    featured: true
  }
];

const FeaturedVehicles = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : 
                       typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1;
  
  const nextSlide = () => {
    setStartIndex((prevIndex) => 
      prevIndex + visibleCount >= featuredVehicles.length ? 0 : prevIndex + visibleCount
    );
  };
  
  const prevSlide = () => {
    setStartIndex((prevIndex) => 
      prevIndex - visibleCount < 0 ? Math.max(0, featuredVehicles.length - visibleCount) : prevIndex - visibleCount
    );
  };
  
  const visibleVehicles = featuredVehicles.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out">
          {visibleVehicles.map((vehicle) => (
            <div key={vehicle.id} className="w-full md:w-1/2 lg:w-1/3 px-2">
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-luxe-black/80 hover:bg-luxe-yellow text-luxe-yellow hover:text-luxe-black p-2 rounded-full shadow-lg transition-colors"
        aria-label="Previous vehicle"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-luxe-black/80 hover:bg-luxe-yellow text-luxe-yellow hover:text-luxe-black p-2 rounded-full shadow-lg transition-colors"
        aria-label="Next vehicle"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default FeaturedVehicles;
