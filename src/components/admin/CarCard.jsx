import React from 'react';

const CarCard = ({ car, handleDeleteCar, loading }) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
      {car.image && <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 text-foreground font-montserrat">{car.name}</h3>
        <div className="text-sm text-muted-foreground space-y-1 mb-4">
          <p>Category: {car.category}</p>
          <p>Fuel: {car.fuel_type}</p>
          <p>Transmission: {car.transmission}</p>
          <p>Year: {car.year}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-luxe-yellow">Rs {car.price}/day</span>
          <div className="flex gap-2">
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeleteCar(car.id)}
              className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;