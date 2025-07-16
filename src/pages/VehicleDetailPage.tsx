import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Fuel,
  Users,
  Car,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import supabase from "../lib/supabase";

const VehicleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [vehicle, setVehicle] = useState(null);
  const [bookingData, setBookingData] = useState({});

  const fetchVehicle = async () => {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;

      // Transform the gallery images into an array for easier handling
      const gallery = [
        data.gallery_image_1,
        data.gallery_image_2,
        data.gallery_image_3,
        data.gallery_image_4,
        data.gallery_image_5,
      ].filter((image) => image); // Remove null values

      // Transform features into an array
      const features = [
        data.feature_1,
        data.feature_2,
        data.feature_3,
        data.feature_4,
        data.feature_5,
        data.feature_6,
        data.feature_7,
      ].filter((feature) => feature); // Remove null values

      // Prepare specs object
      const specs = {
        engine: data.engine,
        power: data.power,
        torque: data.torque,
        acceleration: data.acceleration,
        topSpeed: data.top_speed,
        transmission: data.transmission,
        drivetrain: data.drivetrain,
        fuelType: data.fuel_type,
        fuelConsumption: data.fuel_consumption,
        seats: data.seats,
        doors: data.doors,
        year: data.year,
        color: data.color,
      };

      // Update state with transformed data
      setVehicle({
        ...data,
        gallery,
        features,
        specs,
      });
      
      const LocalData = JSON.parse(localStorage.getItem("carRentalFormData"));
      if (LocalData) {
        setBookingData(LocalData);
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % vehicle.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + vehicle.gallery.length) % vehicle.gallery.length
    );
  };

  const handleProceedToBooking = async () => {
    try {
      // Check if user is logged in
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        navigate('/login')
      }

      localStorage.setItem('carId',vehicle.id)
      
      // Navigate to booking page with vehicle id
      navigate(`/VehicleBookingPage`);
    } catch (error) {
      console.error("Error proceeding to booking:", error);
    }
  };

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-luxe-black pt-20 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-luxe-white mb-4">
            Vehicle Not Found
          </h1>
          <p className="text-luxe-gray mb-6">
            The vehicle you're looking for is not available.
          </p>
          <Link
            to="/vehicles"
            className="btn-primary inline-flex items-center"
          >
            <ChevronLeft size={18} className="mr-2" />
            Browse Other Vehicles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxe-black pt-20">
      {/* Vehicle Gallery */}
      <section className="bg-luxe-black">
        <div className="container mx-auto px-4 py-8">
          <Link
            to="/vehicles"
            className="inline-flex items-center text-luxe-gray hover:text-luxe-yellow mb-6 transition-colors"
          >
            <ChevronLeft size={18} className="mr-1" />
            Back to Vehicles
          </Link>
          <div className="relative rounded-xl overflow-hidden aspect-video">
            <img
              src={vehicle.gallery[currentImageIndex]}
              alt={`${vehicle.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-luxe-black/70 hover:bg-luxe-yellow p-2 rounded-full text-luxe-white hover:text-luxe-black transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-luxe-black/70 hover:bg-luxe-yellow p-2 rounded-full text-luxe-white hover:text-luxe-black transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 right-4 bg-luxe-black/70 text-luxe-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {vehicle.gallery.length}
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {vehicle.gallery.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`aspect-video rounded-lg overflow-hidden border-2 ${
                  currentImageIndex === index
                    ? "border-luxe-yellow"
                    : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt={`${vehicle.name} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>
       {/* Booking Summary/CTA */}
     
      {/* Vehicle Information */}
      <section className="pt-10 pb-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Vehicle Details */}
            <div className="lg:w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-luxe-white mb-2">
                    {vehicle.name}
                  </h1>
                  <div className="flex items-center text-luxe-gray">
                    <Car size={18} className="mr-2 text-luxe-yellow" />
                    <span>{vehicle.category}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 w-max border-2 border-luxe-yellow text-luxe-white py-2 px-4 rounded-lg text-2xl font-bold">
                  Rs {vehicle.price} /hr
                </div>
              </div>
              <div className=" flex justify-center pb-10">
            <Button
              onClick={handleProceedToBooking}
              className="md:w-1/2   py-8 text-2xl  bg-luxe-yellow text-luxe-black font-montserrat font-bold hover:opacity-90 transition-opacity"
            >
              {Object.keys(bookingData).length > 0 ? "Proceed to Booking" : "Select Rental Details"}
            </Button>
        </div>
     
              <p className="text-luxe-gray mb-8">{vehicle.description}</p>
              <Tabs defaultValue="specs" className="mb-10">
                <TabsList className="bg-luxe-darkgray text-luxe-white mb-6">
                  <TabsTrigger
                    value="specs"
                    className="data-[state=active]:bg-luxe-yellow data-[state=active]:text-luxe-black"
                  >
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className="data-[state=active]:bg-luxe-yellow data-[state=active]:text-luxe-black"
                  >
                    Features
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="specs">
                  <div className="bg-luxe-darkgray rounded-lg p-6">
                    <h3 className="text-xl font-bold text-luxe-white mb-4">
                      Technical Specifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      <div className="flex justify-between border-b border-luxe-black pb-2">
                        <span className="text-luxe-gray">Engine</span>
                        <span className="text-luxe-white font-medium">
                          {vehicle.specs.engine}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-luxe-black pb-2">
                        <span className="text-luxe-gray">Power</span>
                        <span className="text-luxe-white font-medium">
                          {vehicle.specs.power}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-luxe-black pb-2">
                        <span className="text-luxe-gray">Torque</span>
                        <span className="text-luxe-white font-medium">
                          {vehicle.specs.torque}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-luxe-black pb-2">
                        <span className="text-luxe-gray">Acceleration</span>
                        <span className="text-luxe-white font-medium">
                          {vehicle.specs.acceleration}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-luxe-black pb-2">
                        <span className="text-luxe-gray">Top Speed</span>
                        <span className="text-luxe-white font-medium">
                          {vehicle.specs.topSpeed}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-luxe-black pb-2">
                        <span className="text-luxe-gray">Transmission</span>
                        <span className="text-luxe-white font-medium">
                          {vehicle.specs.transmission}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-luxe-black pb-2">
                        <span className="text-luxe-gray">Drivetrain</span>
                        <span className="text-luxe-white font-medium">
                          {vehicle.specs.drivetrain}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-luxe-black pb-2">
                        <span className="text-luxe-gray">Fuel Type</span>
                        <span className="text-luxe-white font-medium">
                          {vehicle.specs.fuelType}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-luxe-black pb-2">
                        <span className="text-luxe-gray">Fuel Consumption</span>
                        <span className="text-luxe-white font-medium">
                          {vehicle.specs.fuelConsumption} Avg
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-luxe-black pb-2">
                        <span className="text-luxe-gray">Seats</span>
                        <span className="text-luxe-white font-medium">
                          {vehicle.specs.seats}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-luxe-black pb-2">
                        <span className="text-luxe-gray">Doors</span>
                        <span className="text-luxe-white font-medium">
                          {vehicle.specs.doors}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-luxe-black pb-2">
                        <span className="text-luxe-gray">Year</span>
                        <span className="text-luxe-white font-medium">
                          {vehicle.specs.year}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-luxe-black pb-2">
                        <span className="text-luxe-gray">Color</span>
                        <span className="text-luxe-white font-medium">
                          {vehicle.specs.color}
                        </span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="features">
                  <div className="bg-luxe-darkgray rounded-lg p-6">
                    <h3 className="text-xl font-bold text-luxe-white mb-4">
                      Vehicle Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {vehicle.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle
                            size={18}
                            className="text-luxe-yellow mr-2 flex-shrink-0"
                          />
                          <span className="text-luxe-gray">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-luxe-darkgray p-4 rounded-lg text-center">
                  <Users
                    size={24}
                    className="text-luxe-yellow mx-auto mb-2"
                  />
                  <span className="text-luxe-white font-medium">
                    {vehicle.specs.seats} Seats
                  </span>
                </div>
                <div className="bg-luxe-darkgray p-4 rounded-lg text-center">
                  <Fuel
                    size={24}
                    className="text-luxe-yellow mx-auto mb-2"
                  />
                  <span className="text-luxe-white font-medium">
                    {vehicle.specs.fuelType}
                  </span>
                </div>
                <div className="bg-luxe-darkgray p-4 rounded-lg text-center">
                  <Gauge
                    size={24}
                    className="text-luxe-yellow mx-auto mb-2"
                  />
                  <span className="text-luxe-white font-medium">
                    {vehicle.specs.power}
                  </span>
                </div>
                <div className="bg-luxe-darkgray p-4 rounded-lg text-center">
                  <Sparkles
                    size={24}
                    className="text-luxe-yellow mx-auto mb-2"
                  />
                  <span className="text-luxe-white font-medium">
                    {vehicle.specs.year}
                  </span>
                </div>
              </div>
            </div>

     
          </div>
        </div>
      </section>

    
    
    </div>
  );
};

export default VehicleDetailPage;