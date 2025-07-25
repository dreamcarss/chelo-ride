import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-luxe-black text-white pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6 text-center">
          Contact Chelo Ride – Best Car Rentals in Vizag
        </h1>
        <p className="text-gray-300 text-center mb-12">
          Looking to book a car rental in Visakhapatnam? Need a self-drive or chauffeur-driven car in Vizag? Reach out to Dream Cars Vizag – your trusted partner for flexible, affordable, and reliable rides in the city and beyond.
        </p>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center bg-gray-900 p-6 rounded-lg text-center justify-center">
            <Phone className="text-yellow-400 mb-4" size={28} />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-300">+91 8919617664</p>
          </div>
          <div className="flex flex-col items-center bg-gray-900 p-6 rounded-lg text-center justify-center">
            <Mail className="text-yellow-400 mb-4" size={28} />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-300">dreamcarsvizag@gmail.com</p>
          </div>
          <div className="flex flex-col items-center bg-gray-900 p-6 rounded-lg text-center">
            <MapPin className="text-yellow-400 mb-4" size={28} />
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p className="text-gray-300">
              102, Botta Nilayam, Lane No. S-3, Sampath Nagar, Srinivasa Nagar, Pothinamallayya Palem, Visakhapatnam, Andhra Pradesh 530041
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className=" text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Self Driven or self drive Car in Vizag?</h2>
          <p className="mb-4">
            We offer self-drive cars, chauffeur-driven rentals, and premium vehicles for long drives, outstation trips, and local city rides across Visakhapatnam. Contact Chelo Ride today for transparent pricing and hassle-free booking!
          </p>
          <a
            href="mailto:dreamcarsvizag@gmail.com"
            className="px-5 py-3 bg-luxe-yellow text-black rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Email Us Now
          </a>
        </div>

        {/* Local SEO Text */}
        <div className="mt-16 text-sm text-gray-500 leading-relaxed">
          <p className="mb-4">
            Chelo Ride is your go-to service for <strong>self drive cars in Vizag</strong>, <strong>car rentals in Visakhapatnam</strong>, and <strong>Taxi bookings for Araku and local travel</strong>. Whether you're planning a trip to Araku, need a Thar or Audi for a special occasion, or looking for reliable <strong>outstation cabs in Vizag</strong>, we’ve got you covered.
          </p>
          <p>
            Available services: <em>self drive car rentals in Vizag, car rental with driver in Visakhapatnam, long drive cars, local cabs, luxury car rental, airport pickup, and more.</em>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
