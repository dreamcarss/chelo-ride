
import { Star } from "lucide-react";

export interface TestimonialData {
  id: string;
  name: string;
  rating: number;
  text: string;
  vehicleName?: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialData;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-luxe-darkgray rounded-lg p-6 card-hover">
      <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-luxe-gray flex items-center justify-center mr-4">
            <span className="text-luxe-white font-bold text-lg">
              {testimonial.name.charAt(0).toUpperCase()}
            </span>
          </div>
        <div>
          <h4 className="text-luxe-white font-semibold">{testimonial.name}</h4>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, index) => (
          <Star 
            key={index}
            size={16}
            className={index < testimonial.rating ? "text-luxe-yellow fill-luxe-yellow" : "text-luxe-gray"}
          />
        ))}
      </div>
      
      <p className="text-luxe-gray mb-3">"{testimonial.text}"</p>
      
      {testimonial.vehicleName && (
        <p className="text-luxe-yellow text-sm">Rented: {testimonial.vehicleName}</p>
      )}
    </div>
  );
};

export default TestimonialCard;
