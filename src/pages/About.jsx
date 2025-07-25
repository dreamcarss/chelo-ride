import React from 'react';
import { Clock, DollarSign, Shield, ThumbsUp } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-luxe-black pt-20 mb-20">
      {/* Hero Section */}
      <div className="bg-luxe-black relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-yellow-400 sm:text-6xl">
              CHELO <span className="text-white">Ride</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-300">
              Affordable self drive car rentals in Vizag – drive more, pay less.
            </p>
          </div>
        </div>
      </div>

      {/* About Us Content */}
      <div className="mx-auto max-w-7xl p-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-6">About Chelo Ride</h2>
          <p className="text-gray-300 mb-6">
            Welcome to Chelo Ride – your trusted car rental partner in Vizag (Visakhapatnam). Since 2012, we’ve been providing reliable and affordable <strong>self drive cars in Vizag</strong>, along with options for <strong>car rentals in Vizag with driver</strong>. Whether you're planning a weekend getaway, a business trip, or a long drive to Araku, we have a vehicle that fits your needs.
          </p>
          <p className="text-gray-300 mb-12">
            We take pride in offering flexible rental options, including <strong>hourly, daily, and monthly car rentals in Vizag</strong>. From compact hatchbacks to premium SUVs and even luxury models like Audi and Mahindra Thar, Chelo Ride ensures your journey is comfortable and secure. Looking for a <strong>Taxi booking in Vizag</strong> or a <strong>self drive car rental in Visakhapatnam</strong>? We've got you covered.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-900 p-6 rounded-lg">
              <DollarSign className="text-yellow-400 mb-3" size={28} />
              <h3 className="text-xl font-medium text-white mb-2">Affordable Pricing</h3>
              <p className="text-gray-400">Premium cars at the best rates – perfect for budget-conscious travelers looking for <strong>car rent per day in Vizag</strong>.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <Clock className="text-yellow-400 mb-3" size={28} />
              <h3 className="text-xl font-medium text-white mb-2">Flexible Booking</h3>
              <p className="text-gray-400">Choose your ride by the hour, day, or month. Our <strong>self drive rental cars in Vizag</strong> adapt to your schedule.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <Shield className="text-yellow-400 mb-3" size={28} />
              <h3 className="text-xl font-medium text-white mb-2">Reliable & Safe</h3>
              <p className="text-gray-400">All cars are maintained, insured, and sanitized – perfect for local and <strong>outstation car rentals from Vizag to Araku</strong>.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <ThumbsUp className="text-yellow-400 mb-3" size={28} />
              <h3 className="text-xl font-medium text-white mb-2">Happy Customers</h3>
              <p className="text-gray-400">Thousands trust us for <strong>Taxi rentals in Visakhapatnam</strong>, from <strong>airport pickups</strong> to <strong>long drive cars in Vizag</strong>.</p>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="border-l-4 border-yellow-400 pl-6 mb-16">
            <h3 className="text-xl font-medium text-white mb-3">Our Mission</h3>
            <p className="text-gray-300 italic mb-10">
              "To make high-quality vehicles accessible to everyone by offering affordable, flexible, and customer-focused <strong>car rental services in Vizag</strong>."
            </p>
          </div>

          {/* Keyword Section for SEO */}
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              Popular searches: self drive cars in Vizag, car rental in Visakhapatnam, Vizag to Araku car rental, car travels in Vizag, Taxi booking in Vizag, self drive car rentals in Vizag without deposit, car for rent in Vizag without driver, luxury cars for rent in Visakhapatnam, Thar for rent in Vizag, Ganesh car rental Vizag, Jeep rental in Vizag, Audi car rental Vizag, monthly car rental in Vizag, car hire in Vizag, Vizag car rental airport, car rental services in Vizag and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
