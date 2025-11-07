import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  StarIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/solid";
import Footer from "../components/Footer";

export default function RoomPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState(location.state?.rooms || []);
  const [loading, setLoading] = useState(!rooms.length);
  const [error, setError] = useState(null);

  // If no rooms passed through navigation, fetch public rooms on mount
  useEffect(() => {
    if (!rooms.length) {
      const fetchRooms = async () => {
        try {
          setLoading(true);
          const res = await axios.get("http://localhost:4000/api/rooms/public");
          setRooms(res.data);
        } catch (err) {
          console.error("❌ Error fetching rooms:", err);
          setError("Failed to fetch rooms. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchRooms();
    }
  }, [rooms.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        Loading rooms...
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-800 pt-24 px-6 md:px-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 text-transparent bg-clip-text mb-2">
          Explore Our Rooms
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Find your perfect stay — filter and book easily.
        </p>
      </div>

      {/* Rooms Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room._id || room.id}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col transform hover:-translate-y-1 duration-300"
            >
              {room.images && room.images.length > 0 ? (
                <img
                  src={room.images[0]}
                  alt={room.type}
                  className="w-full h-52 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  No Image Available
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-lg font-bold text-indigo-600 mb-1">
                  {room.type || "Unnamed Room"}
                </h2>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4 text-gray-400" />
                  {room.location || "Unknown"}
                </p>
                <p className="text-sm text-gray-600 flex-1">
                  {(room.description || "No description available.").slice(0, 80)}...
                </p>

                <div className="flex flex-wrap gap-1 mt-3">
                  {(room.amenities || [])
                    .slice(0, 3)
                    .map((a, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gradient-to-r from-cyan-100 to-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                      >
                        {a}
                      </span>
                    ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-yellow-500 gap-1">
                    <StarIcon className="w-4 h-4" />
                    <span className="text-sm font-medium text-gray-800">
                      {room.rating || "4.0"}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700 font-semibold">
                    <CurrencyRupeeIcon className="w-4 h-4" />
                    {room.price || 0}
                    <span className="text-xs text-gray-500 ml-1">/night</span>
                  </div>
                </div>

                <button
                  className={`mt-4 w-full py-2 text-sm font-semibold rounded-xl transition-all backdrop-blur-md ${
                    room.available
                      ? "bg-gradient-to-r from-cyan-400 to-indigo-500 text-white hover:scale-[1.03] hover:shadow-lg"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    room.available && navigate(`/roomdetails/${room._id || room.id}`)
                  }
                >
                  {room.available ? "Book Now" : "Unavailable"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No rooms found matching your filters.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}
