import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import RoomsPage from "./pages/RoomsPage";
import RoomDetailsPage from "./pages/RoomDetailsPage";
import BookingPage from "../src/components/BookingPage";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookingsPage from "./pages/MyBookingsPage";
import AdminDashboard from "./pages/AdminDashboard"; // added missing import
import { useState, useEffect } from "react";

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.theme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.theme = theme;
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navbar theme={theme} setTheme={setTheme} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        {/* Dynamic room details route */}
        <Route path="/roomdetails/:id" element={<RoomDetailsPage />} />
        {/* Booking page */}
        <Route path="/booking" element={<BookingPage />} />
        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/bookingconfirmation" element={<BookingConfirmation />} />
        <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmation />} />
      </Routes>
    </div>
  );
};

export default App;
