import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";

const Profile = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("bookings"); // 'bookings' or 'profile'

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        navigate("/auth");
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from("bookings")
        .select("*, car_id(*)")
        .eq("user", user.id);

      if (error) console.error("Error fetching bookings:", error);
      else setBookings(data || []);

      setLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // Skeleton Loader Component
  const BookingSkeleton = () => (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-md animate-pulse">
      <div className="w-full h-48 bg-gray-800 rounded mb-4"></div>
      <div className="flex justify-between items-start">
        <div className="h-8 bg-gray-800 w-2/3 rounded mb-2"></div>
        <div className="h-6 bg-gray-800 w-16 rounded"></div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {[...Array(6)].map((_, i) => (
          <div key={i}>
            <div className="h-4 bg-gray-800 w-1/2 rounded mb-2"></div>
            <div className="h-5 bg-gray-800 w-3/4 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const baseClass =
      "px-3 py-1 rounded-full text-xs font-medium text-center capitalize";
    switch (status?.toLowerCase()) {
      case "confirmed":
        return <span className={`${baseClass} bg-green-900 text-green-300`}>{status}</span>;
      case "pending":
        return <span className={`${baseClass} bg-yellow-900 text-yellow-300`}>{status}</span>;
      case "cancelled":
        return <span className={`${baseClass} bg-red-900 text-red-300`}>{status}</span>;
      default:
        return <span className={`${baseClass} bg-gray-700 text-gray-300`}>{status || "Unknown"}</span>;
    }
  };

  // Format date in a readable format
  const formatDate = (date, time) => {
    if (!date) return "N/A";
    const dateObj = new Date(`${date}T${time || "00:00"}`);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: time ? "2-digit" : undefined,
      minute: time ? "2-digit" : undefined,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Loading...</h1>
        <BookingSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold  text-white">My Profile</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 mb-6 flex space-x-4">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "bookings"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "profile"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Profile Info
          </button>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === "bookings" ? (
          bookings.length === 0 ? (
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 text-center">
              <h2 className="text-xl text-gray-300 mb-4">No bookings found</h2>
              <button
                onClick={() => navigate("/")}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md text-sm font-medium"
              >
                Browse Cars
              </button>
            </div>
          ) : (
          <div className="space-y-6">
  {bookings.map((booking) => (
    <div
      key={booking.id}
      className="bg-gray-900 border border-gray-700 rounded-lg shadow-sm p-4 flex items-start space-x-4"
    >
      {/* Small Image Icon */}
      <div className="w-16 h-16 flex-shrink-0 relative rounded-md overflow-hidden border border-gray-600">
        <img
          src={booking.car_id?.image || "/api/placeholder/100/100"}
          alt={booking.car_id?.name || "Car"}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/api/placeholder/100/100";
            e.target.alt = "Car image not available";
          }}
        />
        <div className="absolute bottom-0 right-0 bg-yellow-500 text-black text-xs px-1 py-0.5 font-semibold rounded-tl">
          {booking.car_id?.year || "N/A"}
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-start">
          <h2 className="text-base font-semibold text-white">
            {booking.car_id?.make || ""} {booking.car_id?.name || "Car Details"}
          </h2>
          {/* <StatusBadge status={booking.status} /> */}
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-400">Pickup</p>
            <p className="text-white">{formatDate(booking.pickup_date, booking.pickup_time)}</p>
          </div>
          <div>
            <p className="text-gray-400">Return</p>
            <p className="text-white">{formatDate(booking.return_date, booking.return_time)}</p>
          </div>
          <div>
            <p className="text-gray-400">Location</p>
            <p className="text-white">{booking.location || booking.car_id?.location || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-400">City</p>
            <p className="text-white">{booking.city || booking.car_id?.city || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-400">Amount</p>
            <p className="text-yellow-400 font-bold">₹{booking.totalAmount || booking.car_id?.price || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-400">Booking ID</p>
            <p className="text-white">#{booking.id}</p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[booking.car_id?.feature_1, booking.car_id?.feature_2, booking.car_id?.feature_3]
            .filter(Boolean)
            .map((feature, i) => (
              <span
                key={i}
                className="bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-xs"
              >
                {feature}
              </span>
            ))}
        </div>
      </div>
    </div>
  ))}
</div>

          )
        ) : (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-6">User Profile</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-400">Email</p>
                <p className="text-white">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-400">ID</p>
                <p className="text-white">{user.id}</p>
              </div>
              <div>
                <p className="text-gray-400">Created At</p>
                <p className="text-white">{new Date(user.created_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;