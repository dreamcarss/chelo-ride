import React from 'react';
import BookingTable from './BookingTable';
import {

  Search,

} from 'lucide-react';
const BookingsManagement = ({ 
  searchTerm, setSearchTerm, statusFilter, setStatusFilter,
  filteredBookings, loading
}) => {
    cons
  return (
    <div className="space-y-6">
      {/* Bookings Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-foreground font-montserrat">Booking Management</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground placeholder-muted-foreground"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow text-foreground"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <BookingTable 
        loading={loading} 
        filteredBookings={filteredBookings} 
      />
    </div>
  );
};

export default BookingsManagement;