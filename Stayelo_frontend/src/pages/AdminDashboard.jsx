// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Rooms from "../components/Rooms";
// import BookingPage from "../components/BookingPage"; // Import Booking component from components folder
// import CustomerManagementPage from "../components/CustomerManagementPage";


// // Simple 2D Pie Chart using SVG for room status visualization
// const RoomStatusPieChart2D = ({ occupied, unoccupied, service }) => {
//   const total = occupied + unoccupied + service;

//   // Calculate angles for each slice from zero offset cumulatively
//   const occupiedAngle = (occupied / total) * 360;
//   const unoccupiedAngle = (unoccupied / total) * 360;
//   const serviceAngle = (service / total) * 360;

//   const radius = 80;

//   // Helper to create pie slice paths in SVG starting always from angleStart
//   const createSlice = (angleStart, angle) => {
//     const startRadians = (Math.PI / 180) * angleStart;
//     const endRadians = (Math.PI / 180) * (angleStart + angle);

//     // Starting point on circle perimeter
//     const x1 = radius + radius * Math.cos(startRadians);
//     const y1 = radius + radius * Math.sin(startRadians);

//     // Ending point on circle perimeter
//     const x2 = radius + radius * Math.cos(endRadians);
//     const y2 = radius + radius * Math.sin(endRadians);

//     const largeArcFlag = angle > 180 ? 1 : 0;

//     // Path: move to center, line to start point, arc to end point, close path
//     return `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
//   };

//   return (
//     <svg
//       width={180}
//       height={180}
//       viewBox={`0 0 ${radius * 2} ${radius * 2}`}
//       className="mx-auto"
//       role="img"
//       aria-label="Room status pie chart"
//     >
//       <path fill="#4f46e5" d={createSlice(0, occupiedAngle)} />
//       <path fill="#16a34a" d={createSlice(occupiedAngle, unoccupiedAngle)} />
//       <path fill="#dc2626" d={createSlice(occupiedAngle + unoccupiedAngle, serviceAngle)} />
//       <circle cx={radius} cy={radius} r={radius / 2} fill="white" />
//       <text
//         x={radius}
//         y={radius + 10}
//         textAnchor="middle"
//         fontWeight="bold"
//         fontSize="16px"
//         fill="#333"
//       >
//         Rooms
//       </text>
//     </svg>
//   );
// };

// const AdminDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("dashboard"); // Track active sidebar section

//   const pieData = { occupied: 78, unoccupied: 34, service: 8 };
//   const totalRooms = pieData.occupied + pieData.unoccupied + pieData.service;

//   const pct = (n) => Math.round((n / totalRooms) * 100);

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-800 pt-32">
//       {/* Sidebar */}
//       <Sidebar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         onSectionSelect={setActiveSection}
//         activeSection={activeSection}
//       />

//       {/* Main Content */}
//       <main
//         className={`flex-1 p-6 md:p-8 space-y-8 overflow-y-auto transition-all duration-300 ${
//           sidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-64"
//         }`}
//       >
//         {activeSection === "dashboard" && (
//           <>
//             {/* Stats Section */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//               {[
//                 { label: "Total Bookings", value: "1,234", change: "+5.2%", color: "bg-indigo-500" },
//                 { label: "Today's Check-ins", value: "56", change: "+3.4%", color: "bg-green-500" },
//                 { label: "Today's Check-outs", value: "34", change: "-2.5%", color: "bg-red-500" },
//                 { label: "Occupancy Rate", value: "75%", change: "Stable", color: "bg-yellow-500" },
//               ].map((stat, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all p-6 text-center"
//                 >
//                   <div className={`w-12 h-12 mx-auto rounded-full ${stat.color} mb-3`} />
//                   <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
//                   <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
//                   <p
//                     className={`text-sm font-semibold ${
//                       stat.change.startsWith("-") ? "text-red-500" : "text-green-600"
//                     }`}
//                   >
//                     {stat.change}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Room Status Section */}
//             <section className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-semibold text-indigo-600">Current Room Status</h2>
//                 <span className="text-sm text-gray-600">Total rooms: {totalRooms}</span>
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* 2D Pie Chart */}
//                 <div className="col-span-2 h-96 rounded-lg overflow-hidden bg-gray-50 border border-gray-200 flex items-center justify-center">
//                   <RoomStatusPieChart2D {...pieData} />
//                 </div>

//                 {/* Legend */}
//                 <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm space-y-4">
//                   {[
//                     { label: "Occupied", color: "bg-indigo-500", value: pieData.occupied },
//                     { label: "Unoccupied", color: "bg-green-500", value: pieData.unoccupied },
//                     { label: "To be serviced", color: "bg-red-500", value: pieData.service },
//                   ].map((item) => (
//                     <div key={item.label} className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <span className={`w-3 h-3 rounded-full ${item.color}`} />
//                         <span className="text-sm text-gray-700">{item.label}</span>
//                       </div>
//                       <span className="text-sm font-semibold text-gray-800">
//                         {item.value} ({pct(item.value)}%)
//                       </span>
//                     </div>
//                   ))}
//                   <p className="pt-4 text-xs text-gray-500 border-t border-gray-200">
//                     Updated 24h ago • Static 2D chart
//                   </p>
//                 </div>
//               </div>
//             </section>
//           </>
//         )}

//         {activeSection === "rooms" && <Rooms />}
//         {activeSection === "booking" && <BookingPage />} {/* Render Booking page here */}
//         {activeSection === "customers" && <CustomerManagementPage />}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;





















// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Rooms from "../components/Rooms";
// import BookingPage from "../components/BookingPage";
// import CustomerManagementPage from "../components/CustomerManagementPage";

// // Import Reports section components
// import ReportCard from "../components/ReportCard";
// import BookingTrendsChart from "../components/BookingTrendsChart";
// import RevenueBreakdownChart from "../components/RevenueBreakdownChart";
// import RoomOccupancyBar from "../components/RoomOccupancyBar";

// import DatePicker from "react-datepicker";
// import { motion } from "framer-motion";
// import "react-datepicker/dist/react-datepicker.css";

// const AdminDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("dashboard");

//   // For Reports section
//   const [range, setRange] = useState("30days");
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const ranges = [
//     { label: "Last 7 Days", value: "7days" },
//     { label: "Last 30 Days", value: "30days" },
//     { label: "This Quarter", value: "quarter" },
//     { label: "Custom Range", value: "custom" },
//   ];

//   const handleRangeSelect = (value) => {
//     setRange(value);
//     if (value !== "custom") {
//       setStartDate(null);
//       setEndDate(null);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-800 pt-32">
//       {/* Sidebar */}
//       <Sidebar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         onSectionSelect={setActiveSection}
//         activeSection={activeSection}
//       />

//       {/* Main Content */}
//       <main
//         className={`flex-1 p-6 md:p-8 space-y-8 overflow-y-auto transition-all duration-300 ${
//           sidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-64"
//         }`}
//       >
//         {/* ===================== DASHBOARD SECTION ===================== */}
//         {activeSection === "dashboard" && (
//           <>
//             {/* Top Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//               {[
//                 {
//                   label: "Total Bookings",
//                   value: "1,234",
//                   change: "+5.2%",
//                   color: "bg-indigo-500",
//                 },
//                 {
//                   label: "Today's Check-ins",
//                   value: "56",
//                   change: "+3.4%",
//                   color: "bg-green-500",
//                 },
//                 {
//                   label: "Today's Check-outs",
//                   value: "34",
//                   change: "-2.5%",
//                   color: "bg-red-500",
//                 },
//                 {
//                   label: "Occupancy Rate",
//                   value: "75%",
//                   change: "Stable",
//                   color: "bg-yellow-500",
//                 },
//               ].map((stat, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all p-6 text-center"
//                 >
//                   <div
//                     className={`w-12 h-12 mx-auto rounded-full ${stat.color} mb-3`}
//                   />
//                   <h3 className="text-sm font-medium text-gray-600">
//                     {stat.label}
//                   </h3>
//                   <p className="text-2xl font-bold text-gray-800">
//                     {stat.value}
//                   </p>
//                   <p
//                     className={`text-sm font-semibold ${
//                       stat.change.startsWith("-")
//                         ? "text-red-500"
//                         : "text-green-600"
//                     }`}
//                   >
//                     {stat.change}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Replace Pie Chart with Booking Trends Chart */}
//             <section className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-semibold text-indigo-600">
//                   Booking Trends Overview
//                 </h2>
//                 <span className="text-sm text-gray-600">
//                   Visualized over time
//                 </span>
//               </div>

//               <div className="h-96 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
//                 <BookingTrendsChart
//                   range={range}
//                   startDate={startDate}
//                   endDate={endDate}
//                 />
//               </div>
//             </section>
//           </>
//         )}

//         {/* ===================== ROOMS SECTION ===================== */}
//         {activeSection === "rooms" && <Rooms />}

//         {/* ===================== BOOKINGS SECTION ===================== */}
//         {activeSection === "booking" && <BookingPage />}

//         {/* ===================== CUSTOMERS SECTION ===================== */}
//         {activeSection === "customers" && <CustomerManagementPage />}

//         {/* ===================== REPORTS SECTION ===================== */}
//         {activeSection === "reports" && (
//           <>
//             <div className="flex justify-between items-center">
//               <h1 className="text-2xl font-bold">Reports & Analytics</h1>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
//                 Export
//               </button>
//             </div>

//             <div className="flex flex-wrap items-center gap-3">
//               {ranges.map((r) => (
//                 <button
//                   key={r.value}
//                   onClick={() => handleRangeSelect(r.value)}
//                   className={`px-4 py-2 rounded-full text-sm font-medium ${
//                     range === r.value
//                       ? "bg-blue-100 text-blue-600"
//                       : "bg-white text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   {r.label}
//                 </button>
//               ))}

//               {range === "custom" && (
//                 <motion.div
//                   className="flex items-center gap-3"
//                   initial={{ opacity: 0, y: -5 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   <div className="flex items-center gap-2">
//                     <span className="text-gray-600 text-sm font-medium">
//                       From:
//                     </span>
//                     <DatePicker
//                       selected={startDate}
//                       onChange={(date) => setStartDate(date)}
//                       selectsStart
//                       startDate={startDate}
//                       endDate={endDate}
//                       placeholderText="Start Date"
//                       className="border px-3 py-2 rounded-lg text-sm w-36 focus:ring-2 focus:ring-blue-400 outline-none"
//                     />
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="text-gray-600 text-sm font-medium">
//                       To:
//                     </span>
//                     <DatePicker
//                       selected={endDate}
//                       onChange={(date) => setEndDate(date)}
//                       selectsEnd
//                       startDate={startDate}
//                       endDate={endDate}
//                       minDate={startDate}
//                       placeholderText="End Date"
//                       className="border px-3 py-2 rounded-lg text-sm w-36 focus:ring-2 focus:ring-blue-400 outline-none"
//                     />
//                   </div>
//                 </motion.div>
//               )}
//             </div>

//             <div className="grid grid-cols-4 gap-5">
//               <ReportCard title="Total Revenue" value="$125,830" change="+5.2%" positive />
//               <ReportCard title="Avg. Occupancy Rate" value="82%" change="-1.5%" positive={false} />
//               <ReportCard title="ADR" value="$152.50" change="+2.1%" positive />
//               <ReportCard title="Total Bookings" value="827" change="+8.0%" positive />
//             </div>
                
//            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//              <div className="grid row-span-2 gap-5">
//               <RevenueBreakdownChart />
//             </div>

//             <div className="grid row-span-2 gap-5">
//               <RoomOccupancyBar />
//             </div>
//            </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;












import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Rooms from "../components/Rooms";
import BookingPage from "../components/BookingPage";
import CustomerManagementPage from "../components/CustomerManagementPage";
import ReportCard from "../components/ReportCard";
import BookingTrendsChart from "../components/BookingTrendsChart";
import RevenueBreakdownChart from "../components/RevenueBreakdownChart";
import RoomOccupancyBar from "../components/RoomOccupancyBar";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import jsPDF from "jspdf";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [range, setRange] = useState("30days");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [stats, setStats] = useState({
    totalBookings: 0,
    todayCheckIns: 0,
    todayCheckOuts: 0,
    occupancyRate: "0%",
    totalRevenue: 0,
    totalRooms: 0,
  });
  const [loading, setLoading] = useState(true);

  const ranges = [
    { label: "Last 7 Days", value: "7days" },
    { label: "Last 30 Days", value: "30days" },
    { label: "This Quarter", value: "quarter" },
    { label: "Custom Range", value: "custom" },
  ];

  const handleRangeSelect = (value) => {
    setRange(value);
    if (value !== "custom") {
      setStartDate(null);
      setEndDate(null);
    }
  };

  // ================= FETCH DASHBOARD DATA =================
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const [bookingsRes, roomsRes] = await Promise.all([
          axios.get("http://localhost:4000/api/bookings", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:4000/api/rooms", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // ✅ Match backend response structure
        const bookings = bookingsRes.data?.bookings || [];
        const rooms = roomsRes.data?.rooms || [];

        const today = new Date().toISOString().split("T")[0];

        const todayCheckIns = bookings.filter(
          (b) => b.checkIn?.split("T")[0] === today
        ).length;

        const todayCheckOuts = bookings.filter(
          (b) => b.checkOut?.split("T")[0] === today
        ).length;

        const confirmedBookings = bookings.filter(
          (b) => b.status?.toUpperCase() === "CONFIRMED"
        ).length;

        const occupancyRate =
          rooms.length > 0
            ? `${Math.round((confirmedBookings / rooms.length) * 100)}%`
            : "0%";

        const totalRevenue = bookings.reduce(
          (sum, b) => sum + (b.room?.price || 0),
          0
        );

        setStats({
          totalBookings: bookings.length,
          todayCheckIns,
          todayCheckOuts,
          occupancyRate,
          totalRevenue,
          totalRooms: rooms.length,
        });
      } catch (error) {
        console.error("❌ Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ================= EXPORT REPORT TO PDF =================
  const handleExport = () => {
    const doc = new jsPDF("p", "pt", "a4");

    // Header
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, 595, 70, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("Stayleo Admin Dashboard Report", 40, 45);

    // Body
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    let y = 110;

    const formattedDate = new Date().toLocaleString("en-IN", {
      dateStyle: "long",
      timeStyle: "short",
    });

    // Dynamic readable paragraph
    const paragraph = `
Over the past ${
      range === "custom"
        ? `${startDate?.toLocaleDateString()} to ${endDate?.toLocaleDateString()}`
        : range === "7days"
        ? "7 days"
        : range === "30days"
        ? "30 days"
        : "few weeks"
    }, Stayleo Hotel recorded a total of ${stats.totalBookings} bookings.

Today, there were ${stats.todayCheckIns} check-ins and ${stats.todayCheckOuts} check-outs, marking ${
      stats.todayCheckIns === 0 && stats.todayCheckOuts === 0
        ? "a calm operational day."
        : "steady guest activity."
    }

The current occupancy rate stands at ${stats.occupancyRate}, showing utilization trends across the hotel.

Total revenue generated: ₹${stats.totalRevenue.toLocaleString()}, with ${
      stats.totalRooms
    } rooms actively available in the system.

Generated on ${formattedDate}.
`;

    const lines = doc.splitTextToSize(paragraph.trim(), 520);
    doc.text(lines, 40, y);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text(
      "Stayleo Admin Report | Generated Automatically | © 2025 Stayleo",
      40,
      810
    );

    doc.save(`Stayleo_Report_${new Date().toISOString().split("T")[0]}.pdf`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-800 pt-32">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onSectionSelect={setActiveSection}
        activeSection={activeSection}
      />

      <main
        className={`flex-1 p-6 md:p-8 space-y-8 overflow-y-auto transition-all duration-300 ${
          sidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-64"
        }`}
      >
        {activeSection === "dashboard" && (
          <>
            {loading ? (
              <p className="text-center text-gray-500">Loading data...</p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[
                    {
                      label: "Total Bookings",
                      value: stats.totalBookings,
                      color: "bg-indigo-500",
                    },
                    {
                      label: "Today's Check-ins",
                      value: stats.todayCheckIns,
                      color: "bg-green-500",
                    },
                    {
                      label: "Today's Check-outs",
                      value: stats.todayCheckOuts,
                      color: "bg-red-500",
                    },
                    {
                      label: "Occupancy Rate",
                      value: stats.occupancyRate,
                      color: "bg-yellow-500",
                    },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all p-6 text-center"
                    >
                      <div
                        className={`w-12 h-12 mx-auto rounded-full ${stat.color} mb-3`}
                      />
                      <h3 className="text-sm font-medium text-gray-600">
                        {stat.label}
                      </h3>
                      <p className="text-2xl font-bold text-gray-800">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <section className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-indigo-600">
                      Booking Trends Overview
                    </h2>
                    <span className="text-sm text-gray-600">
                      Visualized over time
                    </span>
                  </div>

                  <div className="h-96 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                    <BookingTrendsChart
                      range={range}
                      startDate={startDate}
                      endDate={endDate}
                    />
                  </div>
                </section>
              </>
            )}
          </>
        )}

        {activeSection === "rooms" && <Rooms />}
        {activeSection === "booking" && <BookingPage />}
        {activeSection === "customers" && <CustomerManagementPage />}

        {activeSection === "reports" && (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Reports & Analytics</h1>
              <button
                onClick={handleExport}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Export
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {ranges.map((r) => (
                <button
                  key={r.value}
                  onClick={() => handleRangeSelect(r.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    range === r.value
                      ? "bg-blue-100 text-blue-600"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {r.label}
                </button>
              ))}

              {range === "custom" && (
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm font-medium">
                      From:
                    </span>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      placeholderText="Start Date"
                      className="border px-3 py-2 rounded-lg text-sm w-36 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm font-medium">
                      To:
                    </span>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      placeholderText="End Date"
                      className="border px-3 py-2 rounded-lg text-sm w-36 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-5">
              <ReportCard
                title="Total Revenue"
                value={`₹${stats.totalRevenue.toLocaleString()}`}
                change="+5.2%"
                positive
              />
              <ReportCard
                title="Avg. Occupancy Rate"
                value={stats.occupancyRate}
                change="-1.5%"
                positive={false}
              />
              <ReportCard
                title="Total Rooms"
                value={stats.totalRooms}
                change="+2.1%"
                positive
              />
              <ReportCard
                title="Total Bookings"
                value={stats.totalBookings}
                change="+8.0%"
                positive
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <RevenueBreakdownChart />
              <RoomOccupancyBar />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
