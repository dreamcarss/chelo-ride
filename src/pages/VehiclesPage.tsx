
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import VehicleCard, { VehicleData } from "@/components/VehicleCard";
import SearchForm from "@/components/SearchForm";
import { 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal,
  X
} from "lucide-react";
import supabase from "../lib/supabase"; // Adjust the import based on your project structure
import { set } from "date-fns";
import SpecialOffers from "@/components/SpecialOffers";
// Sample data - in a real app, you would fetch this from an API


// Define filter options
const categories = ["All", "Exotic", "Sports", "Luxury", "SUV", "Convertible"];
const priceRanges = [
  { label: "All", min: 0, max: 10000 },
  { label: "rs0 - rs300", min: 0, max: 300 },
  { label: "rs301 - rs500", min: 301, max: 500 },
  { label: "rs501 - rs750", min: 501, max: 750 },
  { label: "rs751 - rs1000", min: 751, max: 1000 },
  { label: "rs1000+", min: 1000, max: 10000 }
];

const VehiclesPage = () => {
  const location = useLocation();
  const [vehicles, setVehicles] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortOption, setSortOption] = useState("featured");
  const [filterVisible, setFilterVisible] = useState(false);
  const [allVehicles, setAllVehicles] = useState([])
  const [error, setError] = useState(null);



  const fetchVehicles = async () => {
    try {
      const {data,error} =await supabase.from("cars").select("*");
      const filter = JSON.parse(localStorage.getItem("carRentalFormData"));
      const { data: bookingData, error: bookingError } = await supabase
      .from("bookings")
      .select("car_id")
      .or(
        `and(pickup_date.gte.${filter.pickupDate},pickup_date.lte.${filter.returnDate}),` +
        `and(return_date.gte.${filter.pickupDate},return_date.lte.${filter.returnDate}),` +
        `and(pickup_date.lte.${filter.pickupDate},return_date.gte.${filter.returnDate})`
      )
      .eq('city', filter.city)
      .eq('location', filter.location);
      const bookedCarIds = bookingData.map(booking => booking.car_id);

      console.log(bookedCarIds)

      const {data:cars,error:carError} = await supabase.from("cars").select("*").eq('city',filter.city).eq('location',filter.location).not('id', 'in', `(${bookedCarIds.join(",")})`);

      console.log("Fetched vehicles:", cars);
      setVehicles(cars);

 
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  }

  useEffect(() => {
    fetchVehicles();
  }
, []);  

  
  const filterVehicles = (
    category: string, 
    priceRange: { label: string; min: number; max: number }, 
    sort: string
  ) => {
    // Filter by category and price
    let filtered = allVehicles;
    
    if (category !== "All") {
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      filtered = filtered.filter(vehicle => vehicle.category.toLowerCase() === category.toLowerCase());
    }
    
    filtered = filtered.filter(
      vehicle => vehicle.price >= priceRange.min && vehicle.price <= priceRange.max
    );
    
    // Apply sorting
    switch (sort) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => b.year - a.year);
        break;
      case "featured":
      default:
        // Featured vehicles first, then sort by price (low to high)
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.price - b.price;
        });
    }
    
    setVehicles(filtered);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterVehicles(category, selectedPriceRange, sortOption);
  };
  
  const handlePriceRangeChange = (priceRange: { label: string; min: number; max: number }) => {
    setSelectedPriceRange(priceRange);
    filterVehicles(selectedCategory, priceRange, sortOption);
  };
  
  const handleSortChange = (sort: string) => {
    setSortOption(sort);
    filterVehicles(selectedCategory, selectedPriceRange, sort);
  };
  
  const toggleFilters = () => {
    setFilterVisible(!filterVisible);
  };
  
  return (
    <div className="min-h-screen bg-luxe-black pt-20">
    {/* Floating Popup */}
<div className="fixed bottom-5 right-10 z-50 bg-luxe-black bg-opacity-90 text-white px-4 py-3 rounded shadow-lg max-w-xs text-sm text-center font-semibold transition-all duration-300 ease-in-out">
  Facing any booking issues or need a vehicle for less than 24 hours? 
  <a href="/contact" className="text-blue-400 underline ml-1 hover:text-blue-300 transition-colors pr-1">
    Contact us
  </a> 
   or  
  <a
    href="tel:+919876543210"
    className="text-blue-400 underline ml-1 hover:text-blue-300 transition-colors"
  >
    Call us now
  </a>
</div>

{/* Original Section */}
<section className="bg-gradient-to-b from-luxe-black to-luxe-darkgray py-10">
  <div className="container mx-auto px-4">
    <h1 className="text-4xl font-bold text-luxe-white mb-6">Find Your Perfect Vehicle</h1>
    <SearchForm />
  </div>
</section>
   
      {/* Filters and Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            {/* <div className="lg:hidden mb-4">
              <button 
                onClick={toggleFilters}
                className="flex items-center justify-between w-full bg-luxe-darkgray text-luxe-white px-4 py-3 rounded-lg"
              >
                <div className="flex items-center">
                  <Filter size={18} className="mr-2 text-luxe-yellow" />
                  <span>Filters</span>
                </div>
                {filterVisible ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {filterVisible && (
                <div className="mt-4 bg-luxe-darkgray p-5 rounded-lg">
                  <div className="mb-6">
                    <h3 className="text-luxe-white font-semibold mb-3">Category</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className={`px-3 py-2 rounded text-sm rs{
                            selectedCategory === category
                              ? "bg-luxe-yellow text-luxe-black font-semibold"
                              : "bg-luxe-black text-luxe-white hover:bg-luxe-darkgray"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-luxe-white font-semibold mb-3">Price Range</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {priceRanges.map(range => (
                        <button
                          key={range.label}
                          onClick={() => handlePriceRangeChange(range)}
                          className={`px-3 py-2 rounded text-sm rs{
                            selectedPriceRange.label === range.label
                              ? "bg-luxe-yellow text-luxe-black font-semibold"
                              : "bg-luxe-black text-luxe-white hover:bg-luxe-darkgray"
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-luxe-white font-semibold mb-3">Sort By</h3>
                    <select
                      value={sortOption}
                      onChange={e => handleSortChange(e.target.value)}
                      className="w-full px-3 py-2 bg-luxe-black text-luxe-white border border-luxe-darkgray rounded focus:ring-1 focus:ring-luxe-yellow focus:border-luxe-yellow"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low-high">Price: Low to High</option>
                      <option value="price-high-low">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>
                </div>
              )}
            </div> */}
            
            {/* Desktop Filters */}
            {/* <div className="hidden lg:block w-1/4">
              <div className="bg-luxe-darkgray p-6 rounded-lg sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-luxe-white">Filters</h3>
                  <button 
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedPriceRange(priceRanges[0]);
                      setSortOption("featured");
                      filterVehicles("All", priceRanges[0], "featured");
                    }}
                    className="text-luxe-yellow hover:text-luxe-white text-sm flex items-center"
                  >
                    <X size={14} className="mr-1" /> Clear All
                  </button>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-luxe-white font-semibold mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`flex items-center w-full px-3 py-2 rounded text-left rs{
                          selectedCategory === category
                            ? "bg-luxe-yellow text-luxe-black font-semibold"
                            : "text-luxe-white hover:bg-luxe-black/40"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-luxe-white font-semibold mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <button
                        key={range.label}
                        onClick={() => handlePriceRangeChange(range)}
                        className={`flex items-center w-full px-3 py-2 rounded text-left rs{
                          selectedPriceRange.label === range.label
                            ? "bg-luxe-yellow text-luxe-black font-semibold"
                            : "text-luxe-white hover:bg-luxe-black/40"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-luxe-white font-semibold mb-3">Sort By</h4>
                  <select
                    value={sortOption}
                    onChange={e => handleSortChange(e.target.value)}
                    className="w-full px-3 py-2 bg-luxe-black text-luxe-white border border-luxe-darkgray rounded focus:ring-1 focus:ring-luxe-yellow focus:border-luxe-yellow"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            </div> */}
            
            {/* Vehicle Results */}
            <div className="lg:w-full">
              {/* Desktop Sort/Filter Bar */}
              <div className="hidden lg:flex items-center justify-between mb-6 bg-luxe-darkgray p-4 rounded-lg">
                <div className="flex items-center">
                  <SlidersHorizontal size={18} className="text-luxe-yellow mr-2" />
                  <span className="text-luxe-white">
                    Showing <span className="font-semibold">{vehicles.length}</span> vehicles
                  </span>
                </div>
                {/* <div className="flex items-center">
                  <span className="text-luxe-white mr-2">Sort:</span>
                  <select
                    value={sortOption}
                    onChange={e => handleSortChange(e.target.value)}
                    className="bg-luxe-black text-luxe-white border border-luxe-darkgray rounded px-2 py-1 focus:ring-1 focus:ring-luxe-yellow focus:border-luxe-yellow"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div> */}
              </div>
              
              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {vehicles.length > 0 ? (
                  vehicles.map(vehicle => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))
                ) : (
                  <div className="col-span-3 text-center">
                    <p className="text-luxe-gray text-lg">
please  fill the above form for vehicle availability.                    
</p>
     
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
       {/* Special Offers Section */}
      <section className="py-16 md:py-24 justify-center">
        <div className="container mx-auto px-4 w-full">
          <SpecialOffers />
        </div>
      </section>
    </div>
  );
};

export default VehiclesPage;
