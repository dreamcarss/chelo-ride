import TestimonialCard, { TestimonialData } from "./TestimonialCard";

// Sample data - Indian names with SEO-friendly testimonials
const testimonials: TestimonialData[] = [
  {
    id: "1",
    name: "Prasad Mudidana",
    rating: 5,
    text: "Good service and polite respons,They gave car neat and clean,We are satisfied for chelo ride car rental service. Mainly reasonable prices. Thank you chelordie.",
    vehicleName: "Self Drive Car"
  },
  {
    id: "2",
    name: "Sharma",
    rating: 5,
    text: "Good service and polite respons They provide Neat and clean vehicle Reasonble price also.Thank u cheloride.",
    vehicleName: "Comfort Cab"
  },
  {
    id: "3",
    name: "Sandeep Reddy",
    rating: 5,
    text: "Beautiful service. So flawless. I was worried if there can be any hiccups. But the management and the team is so beautiful. The car was very well maintained and so smooth. They are awesome.",
    vehicleName: "Outstation Car Rental"
  }
];

const Testimonials = () => {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-luxe-white mb-3">What Our Clients Say</h2>
        <p className="text-luxe-gray max-w-2xl mx-auto">
          Discover why our clients trust us for car rentals, self drive options, and taxi services.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;