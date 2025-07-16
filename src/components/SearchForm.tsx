import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  addDays,
  format,
  isAfter,
  isBefore,
  parse,
  set,
  isValid,
  addMinutes
} from "date-fns";
import supabase from "../lib/supabase";

const SearchForm = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [allCarsData, setAllCarsData] = useState([]); // Store all car data for filtering

  const [formData, setFormData] = useState({
    city: "",
    location: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    vehicleType: "",
  });
  const [errors, setErrors] = useState({});
  const [showPickupClock, setShowPickupClock] = useState(false);
  const [showReturnClock, setShowReturnClock] = useState(false);

  const pickupDateRef = useRef(null);
  const returnDateRef = useRef(null);
  const pickupClockRef = useRef(null);
  const returnClockRef = useRef(null);

  // Fetch all cities on component mount
  const fetchCities = async () => {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("city, location")
        .limit(1000);
      
      if (error) {
        console.error("Error fetching cities:", error);
        return;
      }

      if (data) {
        // Store all car data for location filtering
        setAllCarsData(data);
        
        // Get unique cities
        const uniqueCities = [...new Set(data.map(item => item.city))];
        setCities(uniqueCities);
        
        console.log("Cities loaded:", uniqueCities);
      }
    } catch (error) {
      console.error("Error in fetchCities:", error);
    }
  };

  // Fetch locations based on selected city
  const fetchLocationsByCity = (selectedCity) => {
    if (!selectedCity || !allCarsData.length) {
      setLocations([]);
      return;
    }

    // Filter locations for the selected city
    const cityLocations = allCarsData
      .filter(item => item.city === selectedCity)
      .map(item => item.location);
    
    // Get unique locations for the selected city
    const uniqueLocations = [...new Set(cityLocations)];
    setLocations(uniqueLocations);
    
    console.log(`Locations for ${selectedCity}:`, uniqueLocations);
  };

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    fetchCities();

    const savedData = localStorage.getItem("carRentalFormData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData((prev) => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, []);

  // Update locations when city changes or when allCarsData is loaded
  useEffect(() => {
    if (formData.city && allCarsData.length > 0) {
      fetchLocationsByCity(formData.city);
    }
  }, [formData.city, allCarsData]);

  // Save form data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("carRentalFormData", JSON.stringify(formData));
  }, [formData]);

  // Handle clicks outside clock pickers to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pickupClockRef.current &&
        !pickupClockRef.current.contains(event.target)
      ) {
        setShowPickupClock(false);
      }
      if (
        returnClockRef.current &&
        !returnClockRef.current.contains(event.target)
      ) {
        setShowReturnClock(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // When pickup date/time changes, ensure return date/time is at least 24 hours later
  useEffect(() => {
    if (formData.pickupDate && formData.pickupTime) {
      const pickupDateTime = parse(
        `${formData.pickupDate} ${formData.pickupTime}`,
        "yyyy-MM-dd h:mm a",
        new Date()
      );
      
      if (isValid(pickupDateTime)) {
        const minReturnDateTime = addMinutes(pickupDateTime, 24 * 60);
        
        // If current return date/time is less than 24 hours after pickup
        const currentReturnDateTime = formData.returnDate && formData.returnTime ? 
          parse(
            `${formData.returnDate} ${formData.returnTime}`,
            "yyyy-MM-dd h:mm a",
            new Date()
          ) : null;
        
        if (!currentReturnDateTime || isBefore(currentReturnDateTime, minReturnDateTime)) {
          // Set return time to same time as pickup but next day
          setFormData(prev => ({
            ...prev,
            returnDate: format(minReturnDateTime, "yyyy-MM-dd"),
            returnTime: formData.pickupTime // Same time next day
          }));
        }
      }
    } else if (formData.pickupDate) {
      // If only pickup date is set (no time yet), update return date to next day
      const pickupDate = new Date(formData.pickupDate);
      if (!isNaN(pickupDate.getTime())) {
        const nextDay = addDays(pickupDate, 1);
        setFormData((prev) => ({
          ...prev,
          returnDate: format(nextDay, "yyyy-MM-dd"),
        }));
      }
    }
  }, [formData.pickupDate, formData.pickupTime]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If city is changed, reset location
    if (name === "city") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        location: "", // Reset location when city changes
      }));
      
      // Clear location error if it exists
      if (errors.location) {
        setErrors((prev) => ({
          ...prev,
          location: null,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Clear field error
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleTimeSelect = (time, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: time,
    }));
    if (field === "pickupTime") {
      setShowPickupClock(false);
    } else {
      setShowReturnClock(false);
    }
  };

  const handleIconClick = (ref) => {
    if (ref && ref.current) {
      ref.current.click();
    }
  };

  const validateForm = () => {
    const newErrors = {};
  
    // Check required fields
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.pickupDate) newErrors.pickupDate = "Pickup date is required";
    if (!formData.pickupTime) newErrors.pickupTime = "Pickup time is required";
    if (!formData.returnDate) newErrors.returnDate = "Return date is required";
    if (!formData.returnTime) newErrors.returnTime = "Return time is required";
  
    // Parse pickup and return datetime
    const pickupDateTime = parse(
      `${formData.pickupDate} ${formData.pickupTime}`,
      "yyyy-MM-dd h:mm a",
      new Date()
    );
    
    const returnDateTime = parse(
      `${formData.returnDate} ${formData.returnTime}`,
      "yyyy-MM-dd h:mm a",
      new Date()
    );
  
    // Validate minimum booking duration of 24 hours
    if (
      isValid(pickupDateTime) &&
      isValid(returnDateTime)
    ) {
      const pickupPlusOneDay = addMinutes(pickupDateTime, 24 * 60);
      
      if (isBefore(returnDateTime, pickupPlusOneDay)) {
        newErrors.returnTime = "Rental duration must be at least 24 hours";
      }
    }
  
    // Validate no pickups or returns between 11 PM and 7 AM
    if (isValid(pickupDateTime)) {
      const hour = pickupDateTime.getHours();
      if (hour >= 23 || hour < 7) {
        newErrors.pickupTime = "Pickup time must be between 7 AM and 11 PM";
      }
    }
  
    if (isValid(returnDateTime)) {
      const hour = returnDateTime.getHours();
      if (hour >= 23 || hour < 7) {
        newErrors.returnTime = "Return time must be between 7 AM and 11 PM";
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to determine if a specific time should be available based on context
  const isTimeAvailable = (timeString, dateString, isReturnTime = false) => {
    // Parse the time
    const [hourMin, period] = timeString.split(' ');
    const [hourStr, minuteStr] = hourMin.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    
    // Convert to 24-hour format
    let hour24 = hour;
    if (period === 'PM' && hour !== 12) hour24 += 12;
    if (period === 'AM' && hour === 12) hour24 = 0;
    
    // Create datetime for this slot
    const currentDate = new Date();
    const selectedDate = new Date(dateString);
    const slotDateTime = new Date(selectedDate);
    slotDateTime.setHours(hour24, minute, 0, 0);
    
    // Check if the date is today
    const isToday = (
      selectedDate.getDate() === currentDate.getDate() && 
      selectedDate.getMonth() === currentDate.getMonth() && 
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
    
    // If it's today, don't show times that have already passed (plus 1hr buffer)
    if (isToday) {
      const bufferTime = new Date(currentDate);
      bufferTime.setMinutes(currentDate.getMinutes() + 60); // Add 1-hour buffer
      
      if (slotDateTime <= bufferTime) {
        return false;
      }
    }
    
    // Restrict hours between 7 AM and 11 PM
    if (hour24 >= 23 || hour24 < 7) {
      return false;
    }
    
    // If this is a return time, make sure it's at least 24 hours after pickup
    if (isReturnTime && formData.pickupDate && formData.pickupTime) {
      // Parse pickup date and time
      const [pickupHourMin, pickupPeriod] = formData.pickupTime.split(' ');
      const [pickupHourStr, pickupMinuteStr] = pickupHourMin.split(':');
      const pickupHour = parseInt(pickupHourStr, 10);
      const pickupMinute = parseInt(pickupMinuteStr, 10);
      
      // Convert to 24-hour format
      let pickupHour24 = pickupHour;
      if (pickupPeriod === 'PM' && pickupHour !== 12) pickupHour24 += 12;
      if (pickupPeriod === 'AM' && pickupHour === 12) pickupHour24 = 0;
      
      // Create datetime for pickup
      const pickupDateTime = new Date(formData.pickupDate);
      pickupDateTime.setHours(pickupHour24, pickupMinute, 0, 0);
      
      // Add 24 hours to pickup time
      const minReturnTime = new Date(pickupDateTime);
      minReturnTime.setHours(minReturnTime.getHours() + 24);
      
      // Check if this time slot is at least 24 hours after pickup
      if (slotDateTime < minReturnTime) {
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    if (validateForm()) {
      navigate("/vehicles");
    }
    else {
    alert("Please fill in all fields.");
  }
  };

  const getFieldClasses = (fieldName) => {
    return `w-full pl-10 pr-3 py-3 bg-white text-black border  ${
      errors[fieldName] ? "border-red-500" : "border-gray-700"
    } rounded focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 cursor-pointer`;
  };

  // Generate available times for display in the time picker
  const generateAvailableTimes = (isReturnPicker = false) => {
    const result = {};
    const dateToCheck = isReturnPicker ? formData.returnDate : formData.pickupDate;
    
    if (!dateToCheck) return {};
    
    const currentDate = new Date();
    const selectedDate = new Date(dateToCheck);
    const isToday = (
      selectedDate.getDate() === currentDate.getDate() && 
      selectedDate.getMonth() === currentDate.getMonth() && 
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
    
    // Current hour (for today filtering)
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    
    // Create time slots for each hour (7 AM to 10 PM)
    for (let i = 7; i < 23; i++) {
      // Skip hours that have already passed plus buffer for today
      if (isToday && i <= currentHour + 1) {
        // Special case: if we're in the buffer hour (currentHour + 1),
        // check if we're past the 30-minute mark for the :30 option
        if (i === currentHour + 1 && currentMinute < 30) {
          // If we're in the buffer hour but before :30, only show the :30 option
          const hour12 = i % 12 === 0 ? 12 : i % 12;
          const period = i >= 12 ? "PM" : "AM";
          const hourKey = `${hour12} ${period}`;
          const timeOption = `${hour12}:30 ${period}`;
          
          if (isTimeAvailable(timeOption, dateToCheck, isReturnPicker)) {
            result[hourKey] = [timeOption];
          }
        }
        // Skip if we're completely past this hour (or past :30 in the buffer hour)
        continue;
      }
      
      const hour12 = i % 12 === 0 ? 12 : i % 12;
      const period = i >= 12 ? "PM" : "AM";
      const hourKey = `${hour12} ${period}`;
      
      const times = [
        `${hour12}:00 ${period}`,
        `${hour12}:30 ${period}`
      ].filter(time => isTimeAvailable(time, dateToCheck, isReturnPicker));
      
      if (times.length > 0) {
        result[hourKey] = times;
      }
    }
    
    return result;
  };

  // For pickup time clock
  const pickupTimesByHour = formData.pickupDate ? generateAvailableTimes(false) : {};

  // For return time clock
  const returnTimesByHour = formData.returnDate ? generateAvailableTimes(true) : {};

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black rounded-lg p-5 md:p-6 shadow-lg max-w-5xl mx-auto border border-gray-800"
    >
      <h2 className="text-yellow-500 text-xl font-bold mb-4">
        Find Your Luxury Ride
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* City Select */}
        <div className="relative">
          <div
            className="absolute inset-y-0 left-0 pl-3 flex items-center text-yellow-500 pointer-events-none z-10"
            onClick={() => document.getElementById("city-select").focus()}
          >
            <MapPin size={18} />
          </div>
          <select
            id="city-select"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={getFieldClasses("city")}
          >
            <option value="">Select Pickup City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
        
        {/* Location Select */}
        <div className="relative">
          <div
            className="absolute inset-y-0 left-0 pl-3 flex items-center text-yellow-500 pointer-events-none z-10"
            onClick={() => document.getElementById("location-select").focus()}
          >
            <MapPin size={18} />
          </div>
          <select
            id="location-select"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={getFieldClasses("location")}
            disabled={!formData.city} // Disable if no city is selected
          >
            <option value="">
              {formData.city ? "Select Pickup Location" : "Select a city first"}
            </option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {/* Pickup Date */}
        <div className="relative">
          <label className="block text-yellow-500 text-sm mb-1">Pickup Date</label>
          <input
            onClick={() => handleIconClick(pickupDateRef)}
            ref={pickupDateRef}
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            min={format(new Date(), "yyyy-MM-dd")}
            className={getFieldClasses("pickupDate")}
          />
          {errors.pickupDate && (
            <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>
          )}
        </div>
        
        {/* Pickup Time */}
        <div className="relative">
          <label className="block text-yellow-500 text-sm mb-1">Pickup Time</label>
          <div
            className="absolute top-9 left-0 pl-3 flex items-center text-yellow-500 pointer-events-none z-10"
            onClick={() => setShowPickupClock(!showPickupClock)}
          >
            <Clock size={18} />
          </div>
          <div
            className={getFieldClasses("pickupTime") + " flex items-center"}
            onClick={() => setShowPickupClock(!showPickupClock)}
          >
            {formData.pickupTime || "Select Time"}
          </div>
          {errors.pickupTime && (
            <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>
          )}
          {/* Pickup Time Clock */}
          {showPickupClock && (
            <div
              ref={pickupClockRef}
              className="absolute z-50 mt-1 bg-black border border-gray-700 rounded-lg p-4 shadow-lg w-72"
            >
              <div className="flex items-center justify-between mb-3 border-b border-gray-700 pb-2">
                <h3 className="text-yellow-500 font-medium">Select Time</h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setShowPickupClock(false)}
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                {Object.keys(pickupTimesByHour).length > 0 ? (
                  Object.entries(pickupTimesByHour).map(([hour, times]) => (
                    <div key={hour} className="col-span-6">
                      <div className="text-yellow-500 text-xs mb-1">{hour}</div>
                      <div className="grid grid-cols-2 gap-1">
                        {times.map((time) => (
                          <button
                            key={time}
                            type="button"
                            className={`py-1 px-2 text-sm rounded ${
                              formData.pickupTime === time
                                ? "bg-yellow-500 text-black"
                                : "bg-gray-800 text-white hover:bg-gray-700"
                            }`}
                            onClick={() => handleTimeSelect(time, "pickupTime")}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-6 text-center text-gray-400 py-4">
                    Please select a pickup date first.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Return Date */}
        <div className="relative">
          <label className="block text-yellow-500 text-sm mb-1">Return Date</label>
          <input
            ref={returnDateRef}
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            min={
              formData.pickupDate
                ? format(addDays(new Date(formData.pickupDate), 1), "yyyy-MM-dd")
                : format(addDays(new Date(), 1), "yyyy-MM-dd")
            }
            className={getFieldClasses("returnDate")}
          />
          {errors.returnDate && (
            <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>
          )}
        </div>
        
        {/* Return Time */}
        <div className="relative">
          <label className="block text-yellow-500 text-sm mb-1">Return Time</label>
          <div
            className="absolute top-9 left-0 pl-3 flex items-center text-yellow-500 pointer-events-none z-10"
            onClick={() => setShowReturnClock(!showReturnClock)}
          >
            <Clock size={18} />
          </div>
          <div
            className={getFieldClasses("returnTime") + " flex items-center"}
            onClick={() => setShowReturnClock(!showReturnClock)}
          >
            {formData.returnTime || "Select Time"}
          </div>
          {errors.returnTime && (
            <p className="text-red-500 text-sm mt-1">{errors.returnTime}</p>
          )}
          {/* Return Time Clock */}
          {showReturnClock && (
            <div
              ref={returnClockRef}
              className="absolute z-50 mt-1 bg-black border border-gray-700 rounded-lg p-4 shadow-lg w-72"
            >
              <div className="flex items-center justify-between mb-3 border-b border-gray-700 pb-2">
                <h3 className="text-yellow-500 font-medium">Select Time</h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setShowReturnClock(false)}
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                {Object.keys(returnTimesByHour).length > 0 ? (
                  Object.entries(returnTimesByHour).map(([hour, times]) => (
                    <div key={hour} className="col-span-6">
                      <div className="text-yellow-500 text-xs mb-1">{hour}</div>
                      <div className="grid grid-cols-2 gap-1">
                        {times.map((time) => (
                          <button
                            key={time}
                            type="button"
                            className={`py-1 px-2 text-sm rounded ${
                              formData.returnTime === time
                                ? "bg-yellow-500 text-black"
                                : "bg-gray-800 text-white hover:bg-gray-700"
                            }`}
                            onClick={() => handleTimeSelect(time, "returnTime")}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-6 text-center text-gray-400 py-4">
                    {formData.returnDate 
                      ? "No available times. Please select a different return date."
                      : "Please select a return date first."}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <Button
          type="submit"
          className="w-full py-4 bg-yellow-500 text-black font-bold text-lg hover:bg-yellow-400 transition-colors rounded-md"
        >
          Find Available Vehicles
        </Button>
   </div>
    </form>
  );
};

export default SearchForm;