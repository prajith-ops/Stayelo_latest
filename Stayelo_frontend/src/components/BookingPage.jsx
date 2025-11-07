import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CalendarIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

export default function BookingDashboard() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [viewBooking, setViewBooking] = useState(null);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const dateDropdownRef = useRef(null);

  const itemsPerPage = 5;
  const [startDate, endDate] = dateRange;
  const API_URL = "http://localhost:4000/api/bookings";
  const token = localStorage.getItem("token");

  // ✅ Fetch bookings (ADMIN only)
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
          params: { t: Date.now() }, // avoid caching
        });
        // ✅ backend returns { success: true, bookings }
        if (res.data && res.data.success) {
          setBookings(res.data.bookings);
        } else {
          console.warn("Unexpected response format:", res.data);
        }
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, [token]);

  // ✅ Close date picker when clicked outside
  useEffect(() => {
    const outside = (e) => {
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(e.target)) {
        setShowDateDropdown(false);
      }
    };
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  const formatDateNice = (d) => (d ? new Date(d).toLocaleDateString() : "");

  const statusBadgeClass = (status) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";
      case "CHECKED_IN":
        return "bg-blue-100 text-blue-700";
      case "CHECKED_OUT":
        return "bg-gray-100 text-gray-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const matchesRange = (dateStr) => {
    if (!startDate && !endDate) return true;
    const d = new Date(dateStr);
    if (startDate && endDate) return d >= startDate && d <= endDate;
    if (startDate) return d >= startDate;
    return true;
  };

  // ✅ Apply filters
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return bookings.filter((b) => {
      const matchesSearch =
        !q ||
        b.user?.email?.toLowerCase().includes(q) ||
        b._id?.toLowerCase().includes(q);
      const matchesStatus = !statusFilter || b.status === statusFilter;
      const matchesCheckin = matchesRange(b.checkIn);
      return matchesSearch && matchesStatus && matchesCheckin;
    });
  }, [bookings, search, statusFilter, startDate, endDate]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setDateRange([null, null]);
  };

  const startEdit = (row) => {
    setEditingId(row._id);
    setEditedData({ ...row });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedData({});
  };

  // ✅ Update booking (Admin)
  const saveEdit = async (id) => {
    try {
      const res = await axios.put(
        `${API_URL}/${id}`,
        { status: editedData.status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedBooking = res.data.booking;
      if (updatedBooking) {
        setBookings((prev) =>
          prev.map((p) => (p._id === id ? updatedBooking : p))
        );
        console.log("✅ Booking updated:", updatedBooking);
      }

      setEditingId(null);
      setEditedData({});
    } catch (err) {
      console.error("❌ Error updating booking:", err);
    }
  };

  // ✅ Delete booking (Admin)
  const deleteBooking = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((b) => b._id !== id));
      console.log("🗑️ Booking deleted:", id);
    } catch (err) {
      console.error("❌ Error deleting booking:", err);
    }
  };

  const handleChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const openView = (b) => setViewBooking(b);
  const closeView = () => setViewBooking(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Booking Management
          </h1>
        </div>

        {/* 🔍 Filters */}
        <div className="bg-white rounded-xl shadow px-4 py-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center">
          <input
            type="text"
            placeholder="Search by email or booking ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 bg-gray-50 focus:outline-none"
          />

          <div className="relative" ref={dateDropdownRef}>
            <button
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white"
            >
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700">
                {startDate && endDate
                  ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                  : "Select date"}
              </span>
            </button>

            {showDateDropdown && (
              <div className="absolute mt-2 z-40 bg-white border rounded-lg shadow p-2">
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => setDateRange(update)}
                  inline
                />
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => setDateRange([null, null])}
                    className="text-sm text-gray-600 px-2 py-1"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setShowDateDropdown(false)}
                    className="text-sm text-blue-600 px-2 py-1"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white"
          >
            <option value="">All Status</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="CHECKED_IN">CHECKED_IN</option>
            <option value="CHECKED_OUT">CHECKED_OUT</option>
            <option value="PENDING">PENDING</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>

          <button
            onClick={clearFilters}
            className="border rounded-lg px-3 py-2 bg-gray-50 text-sm"
          >
            Clear Filters
          </button>
        </div>

        {/* 📋 Booking Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-sm text-left text-gray-700">
              <tr>
                <th className="p-3 font-medium">Booking ID</th>
                <th className="p-3 font-medium">User</th>
                <th className="p-3 font-medium">Room</th>
                <th className="p-3 font-medium">Check-in</th>
                <th className="p-3 font-medium">Check-out</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {paginated.map((b) => {
                const isEditing = editingId === b._id;
                return (
                  <tr key={b._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{b._id}</td>
                    <td className="p-3 font-medium">{b.user?.email}</td>
                    <td className="p-3">{b.room?.type || "—"}</td>
                    <td className="p-3">{formatDateNice(b.checkIn)}</td>
                    <td className="p-3">{formatDateNice(b.checkOut)}</td>
                    <td className="p-3">
                      {isEditing ? (
                        <select
                          value={editedData.status}
                          onChange={(e) => handleChange(e, "status")}
                          className="border rounded px-2 py-1 w-full"
                        >
                          <option>CONFIRMED</option>
                          <option>CHECKED_IN</option>
                          <option>CHECKED_OUT</option>
                          <option>CANCELLED</option>
                          <option>PENDING</option>
                        </select>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadgeClass(
                            b.status
                          )}`}
                        >
                          {b.status}
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <div className="inline-flex items-center gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => saveEdit(b._id)}
                              className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                            >
                              <CheckIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => openView(b)}
                              className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => startEdit(b)}
                              className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100"
                            >
                              <PencilSquareIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => deleteBooking(b._id)}
                              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50 text-sm text-gray-600">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              <ArrowLeftIcon className="h-4 w-4" /> Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              Next <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* View Modal */}
        {viewBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-lg p-6 relative">
              <button
                onClick={closeView}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Booking Details
              </h2>
              <p>
                <strong>User:</strong> {viewBooking.user?.email}
              </p>
              <p>
                <strong>Room:</strong> {viewBooking.room?.type}
              </p>
              <p>
                <strong>Check-in:</strong> {formatDateNice(viewBooking.checkIn)}
              </p>
              <p>
                <strong>Check-out:</strong> {formatDateNice(viewBooking.checkOut)}
              </p>
              <p>
                <strong>Status:</strong> {viewBooking.status}
              </p>
              <div className="mt-4 text-center">
                <button
                  onClick={closeView}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
