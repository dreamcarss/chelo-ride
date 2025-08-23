import { ArrowRight, Award, Clock, Shield, Car, Bike, Truck, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import SearchForm from "@/components/SearchForm";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import SpecialOffers from "@/components/SpecialOffers";
import Testimonials from "@/components/Testimonials";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const services = [
    {
      id: 1,
      title: "Taxi Booking",
      subtitle: "City rides",
      description: "Best Taxi booking with professional drivers",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop&crop=center",
      icon: <Car className="w-4 h-4" />,
      color: "from-yellow-500 to-orange-500",
      available: true,
      popular: false,
      url:'/cabbooking'
    },
    {
      id: 2,
      title: "Self Drive Cars",
      subtitle: "Car rentals",
      description: "Self drive cars - drive at your pace",
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop&crop=center",
      icon: <MapPin className="w-4 h-4" />,
      color: "from-blue-500 to-cyan-500",
      available: true,
      popular: true,
      url:'/vehicles'
    },
    {
      id: 3,
      title: "Two Wheeler",
      subtitle: "Beat traffic",
      description: "Quick & economical city rides",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop&crop=center",
      icon: <Bike className="w-4 h-4" />,
      color: "from-green-500 to-emerald-500",
      available: false,
      popular: false
    },
    {
      id: 4,
      title: "Adventure",
      subtitle: "Road trips",
      description: "Caravans for your next adventure",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop&crop=center",
      icon: <Truck className="w-4 h-4" />,
      color: "from-purple-500 to-pink-500",
      available: false,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
          <img 
            src="https://cnjvkaeaedsifidpbfmo.supabase.co/storage/v1/object/public/car-images//ChatGPT%20Image%20May%2031,%202025,%2012_33_18%20PM.png" 
            alt="City at night" 
            className="w-full h-full object-cover opacity-40"
          />
          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left Side - Enhanced Text Content */}
            <div className="lg:col-span-3 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/20 rounded-full px-4 py-2 text-yellow-400 text-sm font-medium">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                Available 24/7
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Best Car Rental in
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Your City
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                Self drive cars, taxi booking services, and car rentals. 
                From local rides to outstation trips, beach car rental - we've got you covered!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <a href="/contact" className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25" >
                  <span className="relative z-10 flex items-center gap-2">
                    Contact us <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
                <a href="/about" className="group border-2 border-slate-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-lg backdrop-blur-sm">
                  <span className="flex items-center gap-2">
                    About us <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>
            </div>

            {/* Right Side - Modern Service Cards */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto lg:mx-0">
                {services.map((service) => (
                  <div 
                    key={service.id}
                    className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 ${
                      service.available 
                        ? 'cursor-pointer hover:shadow-2xl' 
                        : 'opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {/* Background Image */}
                    <div className="aspect-square relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          service.available 
                            ? 'group-hover:scale-110' 
                            : 'grayscale'
                        }`}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        service.available 
                          ? 'from-black/80 via-black/20 to-transparent' 
                          : 'from-black/90 via-black/50 to-black/20'
                      }`} />
                      
                      {/* Popular Badge */}
                      {service.popular && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                          Popular
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="absolute inset-0 p-3 flex flex-col justify-end">
                        <div className="space-y-1">
                          {/* Icon and Title */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`p-1.5 rounded-lg bg-gradient-to-r ${service.color} bg-opacity-90`}>
                              {service.icon}
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-sm leading-tight">
                                {service.title}
                              </h3>
                              <p className="text-slate-300 text-xs">
                                {service.subtitle}
                              </p>
                            </div>
                          </div>
                          
                          {/* Description */}
                          <p className="text-slate-300 text-xs leading-relaxed mb-3">
                            {service.description}
                          </p>
                          
                          {/* Action Button */}
                          <button 
                            onClick={() => {
                              if (service.available) {
                                navigate(`${service.url}`);
                              }
                            }}
                            disabled={!service.available}
                            className={`w-full py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 ${
                              service.available
                                ? `bg-gradient-to-r ${service.color} text-white hover:shadow-lg transform hover:-translate-y-0.5`
                                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            {service.available ? 'Book Now' : 'Coming Soon'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-yellow-400">Our Service</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Experience the difference with our premium transportation solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock size={32} />,
                title: "Instant Booking",
                description: "Book in seconds with our smart app. Real-time tracking and instant confirmations.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Award size={32} />,
                title: "Premium Fleet",
                description: "Handpicked vehicles maintained to perfection. Luxury meets reliability.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <Shield size={32} />,
                title: "Safe & Secure",
                description: "Comprehensive insurance, verified drivers, and 24/7 support for your peace of mind.",
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl text-center transition-all duration-300 hover:transform hover:scale-105 hover:border-slate-600">
                  <div className={`mx-auto w-16 h-16 flex items-center justify-center bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <SpecialOffers />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <Testimonials />
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-black p-8 md:p-12 lg:p-16">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-400 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Hit the Road?
              </h2>
              <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed">
                Join thousands of satisfied customers who trust us for their transportation needs. 
                Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/vehicles" 
                  className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25"
                >
                  <span className="flex items-center justify-center gap-2">
                    Browse Vehicles <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link 
                  to="/contact" 
                  className="border-2 border-slate-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-lg backdrop-blur-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
