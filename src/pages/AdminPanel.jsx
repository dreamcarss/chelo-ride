import React, { useState, useEffect } from 'react';
import {
  Car,
  Calendar,
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Upload,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Camera,
  AlertCircle,
  Loader2
} from 'lucide-react';
import supabase from "../lib/supabase";
import { redirect } from 'react-router-dom';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Data states
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    totalCars: 0
  });

  // New car state
  const [newCar, setNewCar] = useState({
    name: '',
    image: '',
    gallery_image_1: '',
    gallery_image_2: '',
    gallery_image_3: '',
    gallery_image_4: '',
    gallery_image_5: '',
    price: '',
    category: '',
    description: '',
    engine: '',
    power: '',
    torque: '',
    acceleration: '',
    top_speed: '',
    transmission: '',
    drivetrain: '',
    fuel_type: '',
    fuel_consumption: '',
    seats: '',
    doors: '',
    year: '',
    color: '',
    feature_1: '',
    feature_2: '',
    feature_3: '',
    feature_4: '',
    feature_5: '',
    feature_6: '',
    feature_7: '',
    featured: true,
    location: '',
    city: ''
  });

  const [fileInputs, setFileInputs] = useState({
    mainImageFile: null,
    galleryFiles: []
  });

  const [previewUrls, setPreviewUrls] = useState({
    main: '',
    gallery: []
  });

  // Upload function
  const uploadImage = async (file, path) => {
    if (!file) return null;

    const { error: uploadError } = await supabase.storage
      .from('car-images')
      .upload(path, file);

    if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

    const { data } = supabase.storage
      .from('car-images')
      .getPublicUrl(path);

    return data.publicUrl;
  };

  // Handle file selection
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFileInputs(prev => ({ ...prev, mainImageFile: file }));
      setPreviewUrls(prev => ({ ...prev, main: preview }));
    }
  };

  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // Max 5
    const previews = files.map(file => URL.createObjectURL(file));
    setFileInputs(prev => ({ ...prev, galleryFiles: files }));
    setPreviewUrls(prev => ({ ...prev, gallery: previews }));
  };

  // Add or update car
  const handleAddCar = async () => {
    try {
      setLoading(true);

      // Upload images
      let mainImageUrl = newCar.image;
      const galleryUrls = [...Array(5)].fill('');

      if (fileInputs.mainImageFile) {
        mainImageUrl = await uploadImage(
          fileInputs.mainImageFile,
          `cars/main-${Date.now()}.jpg`
        );
      }

      const galleryPromises = fileInputs.galleryFiles.map((file, i) =>
        uploadImage(file, `cars/gallery-${Date.now()}-${i}.jpg`)
      );

      const uploadedGalleryUrls = await Promise.all(galleryPromises);
      uploadedGalleryUrls.forEach((url, i) => {
        galleryUrls[i] = url || '';
      });

      const carData = {
        ...newCar,
        price: parseInt(newCar.price),
        doors: parseInt(newCar.doors),
        seats: parseInt(newCar.seats),
        year: parseInt(newCar.year),
        image: mainImageUrl,
        gallery_image_1: galleryUrls[0] || '',
        gallery_image_2: galleryUrls[1] || '',
        gallery_image_3: galleryUrls[2] || '',
        gallery_image_4: galleryUrls[3] || '',
        gallery_image_5: galleryUrls[4] || '',
        created_at: new Date().toISOString()
      };

      const { error } = await supabase.from('cars').insert([carData]);
      if (error) throw error;

      fetchCars();
      resetForm();
      setActiveTab('cars');
      setSuccess('Car added successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to add car: ' + err.message);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCar = async () => {
    try {
      setLoading(true);

      let mainImageUrl = newCar.image;
      const galleryUrls = [
        newCar.gallery_image_1,
        newCar.gallery_image_2,
        newCar.gallery_image_3,
        newCar.gallery_image_4,
        newCar.gallery_image_5
      ];

      if (fileInputs.mainImageFile) {
        const newPath = `cars/${newCar.id}-main.jpg`;
        await uploadImage(fileInputs.mainImageFile, newPath);
        mainImageUrl = await getPublicUrl(newPath);
      }

      const uploadedGallery = [];
      for (let i = 0; i < fileInputs.galleryFiles.length; i++) {
        const newPath = `cars/${newCar.id}-gallery-${i}.jpg`;
        await uploadImage(fileInputs.galleryFiles[i], newPath);
        uploadedGallery[i] = await getPublicUrl(newPath);
      }

      for (let i = 0; i < uploadedGallery.length; i++) {
        galleryUrls[i] = uploadedGallery[i] || galleryUrls[i];
      }

      const carData = {
        ...newCar,
        price: parseInt(newCar.price),
        doors: parseInt(newCar.doors),
        seats: parseInt(newCar.seats),
        year: parseInt(newCar.year),
        image: mainImageUrl,
        gallery_image_1: galleryUrls[0],
        gallery_image_2: galleryUrls[1],
        gallery_image_3: galleryUrls[2],
        gallery_image_4: galleryUrls[3],
        gallery_image_5: galleryUrls[4]
      };

      const { error } = await supabase.from('cars').update(carData).eq('id', newCar.id);
      if (error) throw error;

      fetchCars();
      resetForm();
      setActiveTab('cars');
      setSuccess('Car updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update car: ' + err.message);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const getPublicUrl = (path) => {
    const { data } = supabase.storage.from('car-images').getPublicUrl(path);
    return data.publicUrl;
  };

  const resetForm = () => {
    setNewCar({
      name: '',
      image: '',
      gallery_image_1: '',
      gallery_image_2: '',
      gallery_image_3: '',
      gallery_image_4: '',
      gallery_image_5: '',
      price: '',
      category: '',
      description: '',
      engine: '',
      power: '',
      torque: '',
      acceleration: '',
      top_speed: '',
      transmission: '',
      drivetrain: '',
      fuel_type: '',
      fuel_consumption: '',
      seats: '',
      doors: '',
      year: '',
      color: '',
      feature_1: '',
      feature_2: '',
      feature_3: '',
      feature_4: '',
      feature_5: '',
      feature_6: '',
      feature_7: '',
      featured: true,
      location: '',
      city: ''
    });
    setFileInputs({ mainImageFile: null, galleryFiles: [] });
    setPreviewUrls({ main: '', gallery: [] });
  };

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('bookings')
        .select('*, cars(*)')
        .gte('created_at', today)
        .order('created_at', { ascending: false });
      console.log(data)
      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      setError('Failed to fetch bookings: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cars
  const fetchCars = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setCars(data || []);
    } catch (err) {
      setError('Failed to fetch cars: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const calculateStats = () => {
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const totalRevenue = bookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    const totalCars = cars.length;
    setStats({ totalBookings, pendingBookings, totalRevenue, totalCars });
  };

  useEffect(() => {
    fetchBookings();
    fetchCars();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [bookings, cars]);

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

 const today = new Date().toISOString().split('T')[0];

const filteredBookings = bookings.filter((booking) => {
  const matchesSearch =
    booking.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.cars?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.user_email?.toLowerCase().includes(searchTerm.toLowerCase());



  if (statusFilter === 'today_pickups') {
    return booking.pickup_date === today;
  }

  if (statusFilter === 'today_drops') {
    return booking.return_date === today;
  }

  if (statusFilter === 'all') {
    return matchesSearch;
  }

  return matchesSearch && booking.status === statusFilter;
});
  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);
      if (error) throw error;
      setBookings(prev =>
        prev.map(booking =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
      setSuccess('Booking status updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update booking status: ' + err.message);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async (carId) => {
    if (!confirm('Are you sure you want to delete this car?')) return;
    try {
      setLoading(true);
      const { error } = await supabase.from('cars').delete().eq('id', carId);
      if (error) throw error;
      setCars(prev => prev.filter(car => car.id !== carId));
      setSuccess('Car deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete car: ' + err.message);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

const checkAuth = async () => {
  setAuthLoading(true);
  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error fetching session:', error);
      setError('Authentication failed. Please log in again.');
      return false;
    }

    if (!session || !session.user) {
      setError('No active session. Please log in again.');
      window.location.href = '/';
      return false;
    }

    console.log(session.user.id);

    const { data, error: userError } = await supabase
      .from('adminroal') // 👀 typo? maybe should be "adminrole"?
      .select('*')
      .eq('admin', session.user.id)
      .single();

    console.log(data);

    if (userError || !data) {
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    setError('Authentication failed. Please log in again.');
  } finally {
    setAuthLoading(false);
  }
};


  useEffect(() => {
    checkAuth();
  }, []);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-luxe-yellow" />
      </div>
    );
  }

  return (
    <>
      {/* Notifications */}
      {error && (
        <div className="fixed top-4 right-4 bg-destructive text-destructive-foreground p-4 rounded-lg shadow-lg z-50 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        </div>
      )}
      {success && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {success}
          </div>
        </div>
      )}

      {/* Main UI */}
      <div className="min-h-screen bg-background font-opensans pt-20 mb-20">
        {/* Header */}
        <div className="bg-card shadow-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-montserrat">Chelo Ride Admin</h1>
                <p className="text-muted-foreground mt-1">Manage your premium car rental business</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Welcome, Admin</span>
                <div className="w-10 h-10 bg-luxe-yellow rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-luxe-black" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    

          {/* Navigation Tabs */}
          <div className="bg-card border border-border rounded-lg mb-8">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'bookings'
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
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'cars'
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
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              {/* Bookings Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h2 className="text-xl font-semibold text-foreground font-montserrat">Booking Management</h2>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${statusFilter === 'all'
                        ? 'bg-luxe-yellow text-luxe-black'
                        : 'bg-card hover:bg-muted text-foreground'
                      }`}
                  >
                    All Bookings
                  </button>
                
                  <button
                    onClick={() => setStatusFilter('today_pickups')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${statusFilter === 'today_pickups'
                        ? 'bg-luxe-yellow text-luxe-black'
                        : 'bg-card hover:bg-muted text-foreground'
                      }`}
                  >
                    Today Pickups
                  </button>
                  <button
                    onClick={() => setStatusFilter('today_drops')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${statusFilter === 'today_drops'
                        ? 'bg-luxe-yellow text-luxe-black'
                        : 'bg-card hover:bg-muted text-foreground'
                      }`}
                  >
                    Today Drops
                  </button>
                </div>
              </div>

              {/* Bookings Table */}
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-luxe-yellow" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full justify-center  divide-y divide-border ">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Customer id
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Customer number
                          </th>
                         
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Car
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Pickup Date & Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Return Date & Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Location
                          </th>

                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Amount
                          </th>
                          
                           <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            documents
                          </th>
                         
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            payment_id
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-card divide-y divide-border">
                        {filteredBookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-muted/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-muted-foreground">{booking.user.split('-')[0]}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-muted-foreground">{booking.user_phone}</div>
                            </td>
                            <td className=" py-4 whitespace-nowrap">
                              <div className="flex items-center flex-col">
                                {booking.cars?.image && (
                                  <img
                                    src={booking.cars.image}
                                    alt={booking.cars.name}
                                    className="w-12 h-8 object-cover rounded mr-3"
                                  />
                                )}
                                <div className="text-sm font-medium text-foreground">{booking.cars?.name}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                              {booking.pickup_date} 
                              <br />
                              {booking.pickup_time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                              {booking.return_date}
                              <br />
                               {booking.return_time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                              {booking.location || '—'}
                              <br />
                             {booking.city || '—'}

                            </td>
                           

                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                              Rs {parseInt(booking.totalAmount).toFixed(2)}
                            </td>
                          
                            
                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                               <a href={booking.document_front_url || '—'} className='' >Open Front</a>
                               <br />
                                <a href={booking.document_back_url || '—'}>Open Back</a>
                            </td>
                          
                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                                {booking.payment_id || '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}


              </div>
              
            </div>
            
          )}

          {/* Content */}
          {activeTab === 'cars' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-foreground font-montserrat">Cars Management</h2>
                <button
                  onClick={() => {
                    resetForm();
                    setActiveTab('addcar');
                  }}
                  className="bg-luxe-yellow text-luxe-black px-6 py-3 rounded-lg hover:bg-luxe-yellow/90 flex items-center gap-2 font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add New Car
                </button>
              </div>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-luxe-yellow" />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cars.map((car) => (
                    <div
                      key={car.id}
                      className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
                    >
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
                          <span className="text-xl font-bold text-luxe-yellow">Rs {car.price}/hr</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setNewCar({ ...car });
                                setActiveTab('addcar');
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCar(car.id)}
                              disabled={loading}
                              className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                            >
                              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Add Car Modal */}
          {activeTab === 'addcar' && (
            <div className=" bg-luxe-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in pt-36 min-h-full">
              <div className="bg-card rounded-lg border border-border p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-foreground font-montserrat">
                    {newCar.id ? 'Update Car' : 'Add New Car'}
                  </h3>
                  <button
                    onClick={() => setActiveTab('cars')}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  newCar.id ? handleUpdateCar() : handleAddCar();
                }}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground font-montserrat">Basic Information</h4>
                      <input
                        type="text"
                        placeholder="Car Name"
                        value={newCar.name}
                        onChange={(e) => setNewCar(p => ({ ...p, name: e.target.value }))}
                        required
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                      <select
                        value={newCar.category}
                        onChange={(e) => setNewCar(p => ({ ...p, category: e.target.value }))}
                        required
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow text-foreground"
                      >
                        <option value="">Select Category</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Luxury">Luxury</option>
                        <option value="Sports">Sports</option>
                      </select>
                      <textarea
                        placeholder="Description"
                        value={newCar.description}
                        onChange={(e) => setNewCar(p => ({ ...p, description: e.target.value }))}
                        rows="4"
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow text-foreground"
                      ></textarea>
                      <input
                        type="number"
                        placeholder="Price per hr (rs)"
                        value={newCar.price}
                        onChange={(e) => setNewCar(p => ({ ...p, price: e.target.value }))}
                        required
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Color"
                        value={newCar.color}
                        onChange={(e) => setNewCar(p => ({ ...p, color: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                      <input
                        type="number"
                        placeholder="Year"
                        value={newCar.year}
                        onChange={(e) => setNewCar(p => ({ ...p, year: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Location (e.g., rk beach)"
                        value={newCar.location}
                        onChange={(e) => setNewCar(p => ({ ...p, location: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={newCar.city}
                        onChange={(e) => setNewCar(p => ({ ...p, city: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                    </div>

                    {/* Technical Specs */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground font-montserrat">Technical Specifications</h4>
                      <input
                        type="text"
                        placeholder="Engine"
                        value={newCar.engine}
                        onChange={(e) => setNewCar(p => ({ ...p, engine: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Power (HP)"
                        value={newCar.power}
                        onChange={(e) => setNewCar(p => ({ ...p, power: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Torque (Nm)"
                        value={newCar.torque}
                        onChange={(e) => setNewCar(p => ({ ...p, torque: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Acceleration (0-100 km/h)"
                        value={newCar.acceleration}
                        onChange={(e) => setNewCar(p => ({ ...p, acceleration: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Top Speed (km/h)"
                        value={newCar.top_speed}
                        onChange={(e) => setNewCar(p => ({ ...p, top_speed: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Transmission"
                        value={newCar.transmission}
                        onChange={(e) => setNewCar(p => ({ ...p, transmission: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Drivetrain"
                        value={newCar.drivetrain}
                        onChange={(e) => setNewCar(p => ({ ...p, drivetrain: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Fuel Type"
                        value={newCar.fuel_type}
                        onChange={(e) => setNewCar(p => ({ ...p, fuel_type: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Fuel Consumption (L/100km)"
                        value={newCar.fuel_consumption}
                        onChange={(e) => setNewCar(p => ({ ...p, fuel_consumption: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                      <input
                        type="number"
                        placeholder="Number of Seats"
                        value={newCar.seats}
                        onChange={(e) => setNewCar(p => ({ ...p, seats: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                      <input
                        type="number"
                        placeholder="Number of Doors"
                        value={newCar.doors}
                        onChange={(e) => setNewCar(p => ({ ...p, doors: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                      />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-4 col-span-2">
                      <h4 className="font-semibold text-foreground font-montserrat">Upload Images</h4>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                          Main Image
                        </label>
                        <input type="file" accept="image/*" onChange={handleMainImageChange} />
                        {previewUrls.main && (
                          <img src={previewUrls.main} alt="Main Preview" className="mt-2 w-48 h-32 object-cover rounded" />
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                          Gallery Images (Max 5)
                        </label>
                        <input type="file" multiple accept="image/*" onChange={handleGalleryImagesChange} />
                        <div className="flex gap-2 mt-2">
                          {previewUrls.gallery.map((url, idx) => (
                            <img key={idx} src={url} alt={`Gallery ${idx}`} className="w-24 h-16 object-cover rounded" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground font-montserrat">Features (up to 7)</h4>
                      {[1, 2, 3, 4, 5, 6, 7].map(i => (
                        <input
                          key={i}
                          type="text"
                          placeholder={`Feature ${i}`}
                          value={newCar[`feature_${i}`]}
                          onChange={(e) => setNewCar(p => ({ ...p, [`feature_${i}`]: e.target.value }))}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-luxe-yellow focus:border-transparent text-foreground"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('cars')}
                      className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-luxe-yellow text-luxe-black rounded-lg hover:bg-luxe-yellow/90 transition-colors font-medium flex items-center gap-2"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : newCar.id ? (
                        'Update Car'
                      ) : (
                        'Add Car'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
