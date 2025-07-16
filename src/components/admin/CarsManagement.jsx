import React from 'react';
import CarCard from './CarCard';

const CarsManagement = ({ cars, loading, handleDeleteCar }) => {
  return (
    <div className="space-y-6">
      {/* Cars Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-foreground font-montserrat">Cars Management</h2>
        <button
          onClick={() => setActiveTab('addcar')}
          className="bg-luxe-yellow text-luxe-black px-6 py-3 rounded-lg hover:bg-luxe-yellow/90 flex items-center gap-2 font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Car
        </button>
      </div>

      {/* Cars Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-luxe-yellow" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} handleDeleteCar={handleDeleteCar} loading={loading} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarsManagement;