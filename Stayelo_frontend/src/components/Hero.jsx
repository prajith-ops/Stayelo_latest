import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [roomType, setRoomType] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    // Validate check-in/out dates
    if (checkIn && checkOut && checkOut < checkIn) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    try {
      // Build params, excluding empty values
      const params = {};
      if (destination.trim()) params.destination = destination.trim();
      if (checkIn) params.checkIn = checkIn;
      if (checkOut) params.checkOut = checkOut;
      if (guests > 0) params.guests = guests;
      if (roomType) params.roomType = roomType;

      // ✅ Correct endpoint
      const { data } = await axios.get(
        "http://localhost:4000/api/rooms/search",
        { params }
      );

      if (!data || data.length === 0) {
        alert("No rooms found. Try different filters.");
        return;
      }

      // Navigate to Rooms page with filtered rooms in state
      navigate("/rooms", { state: { rooms: data } });
    } catch (error) {
      console.error("❌ Error fetching filtered rooms:", error);
      if (error.response?.status === 404) {
        alert("No rooms found for the selected criteria.");
      } else {
        alert("Failed to fetch rooms, please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col item-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url('/herobg.jpg')] bg-cover bg-no-repeat h-screen">
      <h2 className="text-white text-4xl font-extrabold md:text-5xl lg:text-6xl">
        Find Your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-cyan-400">
          Perfect Stay
        </span>
      </h2>
      <p className="mt-2 text-lg text-gray-200">
        Book your next adventure with us. Enjoy the best hotel deals and accommodations.
      </p>

      <form
        onSubmit={handleSearch}
        className="bg-white text-gray-500 rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 mt-6 max-md:mx-auto w-max shadow-lg"
      >
        {/* Destination */}
        <div>
          <label className="font-medium">Destination</label>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="Enter city"
            className="rounded border border-gray-300 px-3 py-2 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Check-in */}
        <div>
          <label className="font-medium">Check in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Check-out */}
        <div>
          <label className="font-medium">Check out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Guests */}
        <div>
          <label className="font-medium">Guests</label>
          <input
            type="number"
            min={1}
            max={10}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="rounded border border-gray-300 px-3 py-2 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400 w-20"
            required
          />
        </div>

        {/* Room Type */}
        <div>
          <label className="font-medium">Room Type</label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Type</option>
            <option value="deluxe">Deluxe</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 py-3 px-5 text-white my-auto font-medium shadow-md hover:shadow-lg"
        >
          <svg
            className="w-5 h-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
          Search
        </button>
      </form>
    </div>
  );
};

export default Hero;
