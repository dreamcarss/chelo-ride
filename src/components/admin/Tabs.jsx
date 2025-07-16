import React from 'react';
import { Calendar, Car } from 'lucide-react';

const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="bg-card border border-border rounded-lg mb-8">
    <nav className="flex space-x-8 px-6">
      <button
        onClick={() => setActiveTab('bookings')}
        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
          activeTab === 'bookings'
            ? 'border-luxe-yellow text-foreground'
            : 'border-transparent text-muted-foreground hover:text-foreground'
        }`}
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Bookings Management
        </div>
      </button>
      <button
        onClick={() => setActiveTab('cars')}
        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
          activeTab === 'cars'
            ? 'border-luxe-yellow text-foreground'
            : 'border-transparent text-muted-foreground hover:text-foreground'
        }`}
      >
        <div className="flex items-center gap-2">
          <Car className="w-4 h-4" />
          Cars Management
        </div>
      </button>
    </nav>
  </div>
);
export default Tabs;