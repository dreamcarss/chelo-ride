import React from 'react';
import { Loader2, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
const BookingTable = ({ loading, filteredBookings }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200'
  };
  const statusIcons = {
    pending: <Clock className="w-4 h-4" />,
    confirmed: <CheckCircle className="w-4 h-4" />,
    completed: <CheckCircle className="w-4 h-4" />,
    cancelled: <XCircle className="w-4 h-4" />
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-luxe-yellow" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Car
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-foreground">{booking.user}</div>
                      <div className="text-sm text-muted-foreground">{booking.user_email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {booking.cars?.gallery_images?.[0] && (
                        <img
                          src={booking.cars.gallery_images[0]}
                          alt={booking.cars.name}
                          className="w-12 h-8 object-cover rounded mr-3"
                        />
                      )}
                      <div className="text-sm font-medium text-foreground">{booking.cars?.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    <div>{booking.pickup_date}</div>
                    <div className="text-muted-foreground">to {booking.return_date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    Rs {booking.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[booking.status]}`}
                    >
                      {statusIcons[booking.status]}
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="text-luxe-yellow hover:text-luxe-yellow/80 mr-3 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingTable;