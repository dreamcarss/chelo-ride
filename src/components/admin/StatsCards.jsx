import React from 'react';
import { Calendar, Clock, Car } from 'lucide-react';

const StatsCards = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div className="bg-card p-6 rounded-lg border border-border">
      <div className="flex items-center">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Calendar className="w-6 h-6 text-blue-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
          <p className="text-2xl font-bold text-foreground">{stats.totalBookings}</p>
        </div>
      </div>
    </div>
    <div className="bg-card p-6 rounded-lg border border-border">
      <div className="flex items-center">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Clock className="w-6 h-6 text-yellow-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-foreground">{stats.pendingBookings}</p>
        </div>
      </div>
    </div>
    <div className="bg-card p-6 rounded-lg border border-border">
      <div className="flex items-center">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Car className="w-6 h-6 text-purple-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-muted-foreground">Total Cars</p>
          <p className="text-2xl font-bold text-foreground">{stats.totalCars}</p>
        </div>
      </div>
    </div>
  </div>
);
export default StatsCards;