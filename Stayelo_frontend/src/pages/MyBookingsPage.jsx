import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || !token) {
      alert("Please log in to view your bookings.");
      setLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);

    if (!user._id) {
      console.error("User ID is missing!");
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/bookings/user/${user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success && Array.isArray(res.data.bookings)) {
          setBookings(res.data.bookings);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
        alert(err.response?.data?.message || "Error loading bookings.");
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      const res = await axios.put(
        `http://localhost:4000/api/bookings/${bookingId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, status: "Cancelled" } : b
          )
        );
        alert("✅ Booking cancelled successfully!");
      } else {
        alert(res.data.message || "Error cancelling booking.");
      }
    } catch (err) {
      console.error("❌ Error cancelling booking:", err);
      alert(err.response?.data?.message || "Error cancelling booking.");
    }
  };

  // 🔹 NEW: Redirect function for booking details
  const handleViewDetails = (bookingId) => {
    navigate(`/booking-confirmation/${bookingId}`);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-xl font-medium">
        Loading your bookings...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-22">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          You have no bookings yet.
        </div>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              <div className="sm:w-1/3 w-full h-48 sm:h-auto">
                <img
                  src={
                    booking.room?.image ||
                    "https://cdn-icons-png.flaticon.com/512/2173/2173791.png"
                  }
                  alt={booking.room?.type || "Room"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start flex-wrap">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {booking.room?.type || "Room"}
                      </h2>
                      <p className="text-sm text-gray-500">
                        ₹{booking.room?.price}/night
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full self-start ${
                        booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : booking.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "Checked-out"
                          ? "bg-purple-100 text-purple-800"
                          : booking.status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">Check-in:</span>{" "}
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Check-out:</span>{" "}
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Guests:</span>{" "}
                      {booking.guests}
                    </p>
                    <p>
                      <span className="font-semibold">Total Price:</span> ₹
                      {booking.totalPrice}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex justify-end space-x-3">
                  {/* 🔹 View Details Button */}
                  <button
                    onClick={() => handleViewDetails(booking._id)}
                    className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>

                  {/* 🔹 Cancel Button */}
                  {booking.status !== "Cancelled" &&
                    booking.status !== "Checked-out" && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Cancel
                      </button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
