
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface OfferData {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: number;
  startDate: string;
  endDate: string;
  vehicleId?: string;
}

interface SpecialOfferCardProps {
  offer: OfferData;
}

const SpecialOfferCard = ({ offer }: SpecialOfferCardProps) => {
  return (
    <div className="bg-gradient-to-r from-luxe-darkgray to-black rounded-lg overflow-hidden shadow-lg card-hover">
      <div className="relative">
        <img 
          src={offer.image} 
          alt={offer.title} 
          className="w-full h-auto object-cover"
        />
    </div>
      
    </div>
  );
};

export default SpecialOfferCard;
