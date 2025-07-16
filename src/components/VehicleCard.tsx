
import { Link } from "react-router-dom";
import { Fuel, Users, Gauge, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VehicleData {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  seats: number;
  fuelType: string;
  year: number;
  transmission: string;
  topSpeed?: number;
  featured?: boolean;
}

interface VehicleCardProps {
  vehicle: VehicleData;
  className?: string;
}

const VehicleCard = ({ vehicle, className }: VehicleCardProps) => {
  return (
    <div 
      className={cn(
        "bg-luxe-darkgray rounded-lg overflow-hidden card-hover",
        vehicle.featured && "border-2 border-luxe-yellow",
        className
      )}
    >
      <div className="relative">
        <img 
          src={vehicle.image} 
          alt={vehicle.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-luxe-yellow text-luxe-black font-montserrat font-bold px-3 py-1 rounded">
          Rs.{vehicle.price}/hr
        </div>
        {vehicle.featured && (
          <div className="absolute top-3 left-3 bg-luxe-black text-luxe-yellow font-montserrat font-semibold px-3 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-luxe-white">{vehicle.name}</h3>
          <span className="text-sm text-luxe-silver bg-luxe-black px-2 py-1 rounded">
            {vehicle.category}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-luxe-gray">
            <Users size={16} className="mr-2 text-luxe-yellow" />
            <span>{vehicle.seats} Seats</span>
          </div>
          <div className="flex items-center text-luxe-gray">
            <Fuel size={16} className="mr-2 text-luxe-yellow" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center text-luxe-gray">
            <CalendarClock size={16} className="mr-2 text-luxe-yellow" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center text-luxe-gray">
            <Gauge size={16} className="mr-2 text-luxe-yellow" />
            <span>{vehicle.transmission}</span>
          </div>
        </div>
        
        <Link 
          to={`/vehicles/${vehicle.id}`}
          className="btn-primary w-full flex justify-center items-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;
