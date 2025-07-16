import { Calendar, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export interface OfferData {
  id: string;
  image: string;
}

interface SpecialOfferCardProps {
  offer: OfferData;
}

const SpecialOfferCard = ({ offer }: SpecialOfferCardProps) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-black rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-80 mx-2">
      <div className="relative">
        <img 
          src={offer.image} 
          alt={offer.image} 
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

// Sample data
const specialOffers: OfferData[] = [
  {
    id: "1",
    image: "https://cnjvkaeaedsifidpbfmo.supabase.co/storage/v1/object/public/car-images//Screenshot%202025-05-31%20125400.png",
  },
  {
    id: "2",
    image: "https://cnjvkaeaedsifidpbfmo.supabase.co/storage/v1/object/public/banners//WhatsApp%20Image%202025-06-25%20at%2008.24.05_85fd31d0.jpg",
  },
  {
    id: "3",
    image: "https://cnjvkaeaedsifidpbfmo.supabase.co/storage/v1/object/public/banners//WhatsApp%20Image%202025-06-25%20at%2008.24.05_e4132259.jpg",
  },
  {
    id: "4",
    image: "https://cnjvkaeaedsifidpbfmo.supabase.co/storage/v1/object/public/banners//WhatsApp%20Image%202025-06-25%20at%2008.24.06_58ef276d.jpg",
  },
  {
    id: "5",
    image: "https://cnjvkaeaedsifidpbfmo.supabase.co/storage/v1/object/public/banners//WhatsApp%20Image%202025-06-25%20at%2008.24.06_caf55758.jpg",
  },
   {
    id: "6",
    image: "https://cnjvkaeaedsifidpbfmo.supabase.co/storage/v1/object/public/banners//WhatsApp%20Image%202025-06-25%20at%2008.24.06_de3b4d5b.jpg",
  },
   {
    id: "7",
    image: "https://cnjvkaeaedsifidpbfmo.supabase.co/storage/v1/object/public/banners//WhatsApp%20Image%202025-06-25%20at%2008.24.07_1319b9d0.jpg",
  },
    {
    id: "8",
    image: "https://cnjvkaeaedsifidpbfmo.supabase.co/storage/v1/object/public/banners//WhatsApp%20Image%202025-06-25%20at%2008.24.07_d20c4633.jpg",
  }
];

const SpecialOffers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const carouselRef = useRef(null);

  // Create duplicated offers for infinite loop
  const duplicatedOffers = [...specialOffers, ...specialOffers];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === specialOffers.length) {
      // When we reach the end of the first set, reset to beginning without transition
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500); // Wait for transition to complete
    } else if (currentIndex === 0 && !isTransitioning) {
      // Re-enable transition after reset
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
    }
  }, [currentIndex, isTransitioning]);

  const cardWidth = 320 + 16; // card width + margin

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Special Offers</h2>
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          ref={carouselRef}
          className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
          style={{
            transform: `translateX(-${currentIndex * cardWidth}px)`
          }}
        >
          {duplicatedOffers.map((offer, index) => (
            <SpecialOfferCard 
              key={`${offer.id}-${index}`} 
              offer={offer} 
            />
          ))}
        </div>
        
        {/* Dots indicator - only show dots for original offers */}
        <div className="flex justify-center mt-6 space-x-2">
          {specialOffers.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === (currentIndex % specialOffers.length) ? 'bg-red-600' : 'bg-gray-600'
              }`}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SpecialOffers;