import React, { useState } from 'react';
import { Car, MapPin, Clock, Phone, Star, Shield, Users, Navigation } from 'lucide-react';

const CabBooking = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', vehicle: '', date: '' });

  const handleBookClick = (vehicle) => {
    setFormData({ name: '', phone: '', vehicle, date: '' });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const sendSMS = async (to, body) => {
    const accountSid =  import.meta.env.VITE_Account_SID;
    const authToken =  import.meta.env.VITE_Auth_Token;
    const messagingServiceSid =  import.meta.env.VITE_Messaging_Service_SID;
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`; 

    const formData = new FormData();
    formData.append('To', to);
    formData.append('MessagingServiceSid', messagingServiceSid);
    formData.append('Body', body);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(accountSid + ':' + authToken)
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('SMS sent:', result.sid);
      return result;
    } catch (error) {
      console.error('SMS failed:', error);
      throw error;
    }
  };
const handleSubmit = () => {
  console.log('Form Data:', formData);

  // Compose message for admin
  const adminPhoneNumber = '+918520800787'; // Admin mobile number
  const messageBody = `
New Booking Request:
Package: ${formData.vehicle}
Name: ${formData.name}
Phone: ${formData.phone}
Pickup Date: ${formData.date}
`;

  // Send SMS to admin
  sendSMS(adminPhoneNumber, messageBody)
    .then(() => {
      alert('Booking request submitted successfully!');
    })
    .catch((err) => {
      alert('Failed to send booking request. Please try again.');
      console.error(err);
    });

  setShowModal(false); // Close modal
};

  return (
    <div className="bg-luxe-black text-luxe-white min-h-screen pt-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Book Taxi in your city</h2>
        <p className="text-gray-400 text-xl">Hassle-free taxi service in Visakhapatnam. SUVs & sedans available.</p>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Looking for self-drive cars?{' '}
          <a href="/vehicles" className="text-luxe-yellow hover:underline">
            Explore our fleet
          </a>
        </p>
      </div>

      {/* Outstation Rates */}
      <section className="py-20 px-4 max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Sedan Card */}
          <div className="bg-gradient-to-br from-luxe-darkgray to-gray-800 p-8 rounded-2xl shadow-2xl border border-luxe-yellow/20 hover:border-luxe-yellow/50 transition-all duration-300 group">
            <div className="relative overflow-hidden rounded-xl mb-6">
              <img
                src="https://cnjvkaeaedsifidpbfmo.supabase.co/storage/v1/object/public/car-images//ARABDUSTER_TOP_SIDE_CUT_SHOT_CHANGES_02.jpg.ximg.l_full_m.smart.jpg "
                alt="5 Seater Sedan"
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-luxe-yellow text-luxe-black px-3 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-luxe-white">5 Seater Sedan</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-luxe-gray/20">
                <span className="text-luxe-gray">Rate per km</span>
                <span className="text-luxe-yellow font-semibold text-lg">₹14</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-luxe-gray/20">
                <span className="text-luxe-gray">Minimum distance</span>
                <span className="text-luxe-white">300 km</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-luxe-gray">Waiting charges</span>
                <span className="text-luxe-white">₹200/hour</span>
              </div>
            </div>
            <button
              className="w-full bg-luxe-yellow text-luxe-black py-3 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => handleBookClick("5 Seater Sedan")}
            >
              Book Sedan
            </button>
          </div>

          {/* SUV Card */}
          <div className="bg-gradient-to-br from-luxe-darkgray to-gray-800 p-8 rounded-2xl shadow-2xl border border-luxe-yellow/20 hover:border-luxe-yellow/50 transition-all duration-300 group">
            <div className="relative overflow-hidden rounded-xl mb-6">
              <img
                src="https://cnjvkaeaedsifidpbfmo.supabase.co/storage/v1/object/public/car-images//pathfinder-interior-19tdiuslhdpace101.jpg.ximg.l_full_m.smart.webp "
                alt="7 Seater SUV"
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Premium
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-luxe-white">7 Seater SUV</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-luxe-gray/20">
                <span className="text-luxe-gray">Rate per km</span>
                <span className="text-luxe-yellow font-semibold text-lg">₹19</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-luxe-gray/20">
                <span className="text-luxe-gray">Minimum distance</span>
                <span className="text-luxe-white">300 km</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-luxe-gray">Waiting charges</span>
                <span className="text-luxe-white">₹300/hour</span>
              </div>
            </div>
            <button
              className="w-full bg-luxe-yellow text-luxe-black py-3 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => handleBookClick("7 Seater SUV")}
            >
              Book SUV
            </button>
          </div>
        </div>
      </section>

      {/* Local Sightseeing Packages */}
      <section className="py-20 px-4 max-w-8xl mx-auto pt-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-luxe-white mb-4">Local Sightseeing Packages</h2>
          <p className="text-luxe-gray text-xl">Explore your city with our comfortable rides</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* 5 Seater Local */}
          <div className="bg-gradient-to-br from-luxe-darkgray to-gray-800 p-8 rounded-2xl shadow-2xl border border-luxe-yellow/20 hover:border-luxe-yellow/50 transition-all duration-300 group">
            <div className="relative overflow-hidden rounded-xl mb-6">
              <img
                src="https://www.fabhotels.com/blog/wp-content/uploads/2018/10/1000x650-313.jpg "
                alt="5 Seater Local Package"
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Local Tour
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-luxe-white">5 Seater Local Package</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-luxe-gray/20">
                <span className="text-luxe-gray">Package Price</span>
                <span className="text-luxe-yellow font-semibold text-lg">₹4,500</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-luxe-gray/20">
                <span className="text-luxe-gray">Duration</span>
                <span className="text-luxe-white">Full Day</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-luxe-gray">Includes</span>
                <span className="text-luxe-white">Driver + Fuel</span>
              </div>
            </div>
            <button
              className="w-full bg-luxe-yellow text-luxe-black py-3 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => handleBookClick("5 Seater Local Package")}
            >
              Book 5 Seater Local
            </button>
          </div>

          {/* 7 Seater Local */}
          <div className="bg-gradient-to-br from-luxe-darkgray to-gray-800 p-8 rounded-2xl shadow-2xl border border-luxe-yellow/20 hover:border-luxe-yellow/50 transition-all duration-300 group">
            <div className="relative overflow-hidden rounded-xl mb-6">
              <img
                src="https://www.fabhotels.com/blog/wp-content/uploads/2018/10/1000x650-313.jpg "
                alt="7 Seater Local Package"
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Local Tour
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-luxe-white">7 Seater Local Package</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-luxe-gray/20">
                <span className="text-luxe-gray">Package Price</span>
                <span className="text-luxe-yellow font-semibold text-lg">₹6,000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-luxe-gray/20">
                <span className="text-luxe-gray">Duration</span>
                <span className="text-luxe-white">Full Day</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-luxe-gray">Includes</span>
                <span className="text-luxe-white">Driver + Fuel</span>
              </div>
            </div>
            <button
              className="w-full bg-luxe-yellow text-luxe-black py-3 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => handleBookClick("7 Seater Local Package")}
            >
              Book 7 Seater Local
            </button>
          </div>
        </div>
      </section>

          {/* Araku Holiday Packages */}
      <section className="py-20 px-4 max-w-8xl mx-auto  pt-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-luxe-white mb-4">
            Araku Holiday Packages
          </h2>
          <p className="text-luxe-gray text-xl">Experience the beauty of Araku Valley</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
  <div className="bg-gradient-to-br from-luxe-darkgray to-gray-800 p-8 rounded-2xl shadow-2xl border border-luxe-yellow/20 hover:border-luxe-yellow/50 transition-all duration-300 group">
            <div className="relative overflow-hidden rounded-xl mb-6">
              <img 
                src="https://www.keralaeverything.com/img/9346f31d3d357ed2cb8122b681aee400.jpg?03" 
                alt="5 Seater Sedan" 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Araku Valley
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-luxe-white">5 Seater Araku Package</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-luxe-gray/20">
                <span className="text-luxe-gray">Package Price</span>
                <span className="text-green-400 font-semibold text-lg">₹6,000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-luxe-gray/20">
                <span className="text-luxe-gray">Destination</span>
                <span className="text-luxe-white">Araku Valley</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-luxe-gray">Trip Type</span>
                <span className="text-luxe-white">Holiday Package</span>
              </div>
            </div>
            <button className="w-full  bg-luxe-yellow text-black py-3 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => handleBookClick("5 Seater Araku Package")}
            >
              Book 5 Seater Araku
            </button>
          </div>

          <div className="bg-gradient-to-br from-luxe-darkgray to-gray-800 p-8 rounded-2xl shadow-2xl border border-luxe-yellow/20 hover:border-luxe-yellow/50 transition-all duration-300 group">
            <div className="relative overflow-hidden rounded-xl mb-6">
              <img 
                src="https://www.keralaeverything.com/img/9346f31d3d357ed2cb8122b681aee400.jpg?03" 
                alt="7 Seater SUV" 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Araku Valley
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-luxe-white">7 Seater Araku Package</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-luxe-gray/20">
                <span className="text-luxe-gray">Package Price</span>
                <span className="text-green-400 font-semibold text-lg">₹8,000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-luxe-gray/20">
                <span className="text-luxe-gray">Destination</span>
                <span className="text-luxe-white">Araku Valley</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-luxe-gray">Trip Type</span>
                <span className="text-luxe-white">Holiday Package</span>
              </div>
            </div>
             <button className="w-full  bg-luxe-yellow text-black py-3 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
               onClick={() => handleBookClick("7 Seater Araku Package")}
             >
              Book 7 Seater Araku
            </button>
          </div>
        </div>
      </section>

      {/* Lambasingi Holiday Packages */}
      <section className="py-20 px-4 max-w-8xl mx-auto  pt-10 pb-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-luxe-white mb-4">
            Lambasingi Holiday Packages
          </h2>
          <p className="text-luxe-gray text-xl">Kashmir of Andhra Pradesh awaits you</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-luxe-darkgray to-gray-800 p-8 rounded-2xl shadow-2xl border border-luxe-yellow/20 hover:border-luxe-yellow/50 transition-all duration-300 group">
            <div className="relative overflow-hidden rounded-xl mb-6">
              <img 
                src="https://images.herzindagi.info/image/2024/Jul/Where-is-Lambasingi.jpg" 
                alt="5 Seater Sedan" 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Hill Station
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-luxe-white">5 Seater Lambasingi Package</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-luxe-gray/20">
                <span className="text-luxe-gray">Package Price</span>
                <span className="text-blue-400 font-semibold text-lg">₹6,000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-luxe-gray/20">
                <span className="text-luxe-gray">Destination</span>
                <span className="text-luxe-white">Lambasingi</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-luxe-gray">Trip Type</span>
                <span className="text-luxe-white">Holiday Package</span>
              </div>
            </div>
          <button className="w-full  bg-luxe-yellow text-black py-3 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            onClick={() => handleBookClick("5 Seater Lambasingi Package")}

          >
              Book 5 Seater Lambasingi
            </button>
          </div>

           <div className="bg-gradient-to-br from-luxe-darkgray to-gray-800 p-8 rounded-2xl shadow-2xl border border-luxe-yellow/20 hover:border-luxe-yellow/50 transition-all duration-300 group">
            <div className="relative overflow-hidden rounded-xl mb-6">
              <img 
                src="https://images.herzindagi.info/image/2024/Jul/Where-is-Lambasingi.jpg" 
                alt="7 Seater SUV" 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Hill Station
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-luxe-white">7 Seater Lambasingi Package</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-luxe-gray/20">
                <span className="text-luxe-gray">Package Price</span>
                <span className="text-blue-400 font-semibold text-lg">₹8,000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-luxe-gray/20">
                <span className="text-luxe-gray">Destination</span>
                <span className="text-luxe-white">Lambasingi</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-luxe-gray">Trip Type</span>
                <span className="text-luxe-white">Holiday Package</span>
              </div>
            </div>
           <button className="w-full  bg-luxe-yellow text-black py-3 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
             onClick={() => handleBookClick("7 Seater Lambasingi Package")}
           >
              Book 7 Seater Lambasingi
            </button>
          </div>
        </div>
      </section>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white text-black p-6 rounded-xl w-80 space-y-4 relative">
            <h3 className="text-xl font-semibold mb-2">Book {formData.vehicle}</h3>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-luxe-yellow text-black py-2 rounded-md font-semibold hover:shadow-lg hover:scale-105 transition"
            >
              Send
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-lg"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CabBooking;