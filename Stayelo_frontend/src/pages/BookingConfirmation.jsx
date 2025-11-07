// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { CheckCircleIcon } from "@heroicons/react/24/solid";
// import jsPDF from "jspdf";

// export default function BookingConfirmation() {
//   const { bookingId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [booking, setBooking] = useState(location.state?.booking || null);
//   const [room, setRoom] = useState(location.state?.room || null);
//   const [loading, setLoading] = useState(!location.state);
//   const [error, setError] = useState("");

//   // 🧭 Debug logs
//   console.log("📦 Fetching booking details...");
//   console.log("➡️ bookingId received from URL:", bookingId);
//   console.log("🧾 Booking from location state:", location.state);

//   // ✅ Fetch booking details if user refreshed page (no state)
//   useEffect(() => {
//     const fetchBooking = async () => {
//       if (!bookingId) {
//         console.warn("⚠️ No bookingId found in URL params!");
//         setLoading(false);
//         return;
//       }

//       console.log(`🌐 Sending GET request to backend: http://localhost:4000/api/bookings/${bookingId}`);

//       try {
//         const res = await axios.get(`http://localhost:4000/api/bookings/${bookingId}`);
//         console.log("✅ Booking fetched from backend:", res.data);
//         setBooking(res.data);

//         if (res.data.roomId) {
//           const res = await axios.get(`http://localhost:4000/api/bookings/${bookingId}`);

//           console.log("🏨 Room fetched from backend:", roomRes.data);
//           setRoom(roomRes.data);
//         } else {
//           console.warn("⚠️ No roomId in booking data");
//         }
//       } catch (err) {
//         console.error("❌ Error fetching booking:", err);
//         setError("Unable to load booking details. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!booking) fetchBooking();
//   }, [bookingId]);

//   // ✅ Generate PDF Voucher
//   const handleDownloadVoucher = () => {
//     if (!booking) return;

//     const doc = new jsPDF("p", "pt", "a4");

//     // Header
//     doc.setFillColor(44, 62, 80);
//     doc.rect(0, 0, 595, 70, "F");
//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(24);
//     doc.text("Stayleo Hotels", 40, 45);
//     doc.setFontSize(14);
//     doc.text("Booking Voucher", 480, 45, { align: "right" });

//     // Booking info
//     doc.setTextColor(0, 0, 0);
//     doc.setFontSize(14);
//     let y = 110;

//     doc.text("Booking Summary", 40, y);
//     y += 20;
//     doc.setFontSize(12);

//     const roomName = room?.name || "Not specified";

//     doc.text(`Booking ID: ${booking._id || "N/A"}`, 40, y);
//     y += 20;
//     doc.text(
//       `Booking Date: ${
//         booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "N/A"
//       }`,
//       40,
//       y
//     );
//     y += 20;
//     doc.text(`Status: ${booking.status || "Pending"}`, 40, y);
//     y += 30;

//     doc.setFontSize(14);
//     doc.text("Stay Details", 40, y);
//     y += 20;
//     doc.setFontSize(12);
//     doc.text(`Room: ${roomName}`, 40, y);
//     y += 20;
//     doc.text(
//       `Check-In: ${
//         booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : "N/A"
//       }`,
//       40,
//       y
//     );
//     y += 20;
//     doc.text(
//       `Check-Out: ${
//         booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : "N/A"
//       }`,
//       40,
//       y
//     );
//     y += 20;
//     doc.text(`Guests: ${booking.guests || 0}`, 40, y);
//     y += 20;
//     doc.text(`Total Price: ₹${booking.totalPrice || 0}`, 40, y);
//     y += 40;

//     doc.setFontSize(11);
//     doc.setTextColor(100, 100, 100);
//     doc.text(
//       "Thank you for booking with Stayleo Hotels. Please carry a valid ID proof at the time of check-in.",
//       40,
//       750,
//       { maxWidth: 500 }
//     );

//     doc.save(`Stayleo_Voucher_${booking._id || "Unknown"}.pdf`);
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
//         Loading booking confirmation...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
//         {error}
//       </div>
//     );

//   if (!booking)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
//         No booking details found.
//       </div>
//     );

//   const { checkIn, checkOut, guests, totalPrice, createdAt, status, _id: id } = booking;
//   console.log("📦 Fetching booking details...");
// console.log("➡️ bookingId received from URL:", bookingId);
// console.log("🧾 Booking from location state:", location.state);


//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-16 px-4">
//       <div className="bg-white shadow-2xl rounded-3xl max-w-2xl w-full p-10 border border-gray-100">
//         <div className="text-center mb-6">
//           <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
//           <h1 className="text-3xl font-bold text-gray-800 mt-3">
//             Booking Confirmed!
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Your booking has been successfully confirmed. A confirmation email has been sent to your registered address.
//           </p>
//         </div>

//         <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
//           <h2 className="text-xl font-semibold text-gray-800 mb-3">
//             Booking Summary
//           </h2>
//           <div className="grid grid-cols-2 gap-y-3 text-gray-700">
//             <p><strong>Booking ID:</strong></p>
//             <p>{id || "N/A"}</p>

//             <p><strong>Booking Date:</strong></p>
//             <p>{createdAt ? new Date(createdAt).toLocaleString() : "N/A"}</p>

//             <p><strong>Status:</strong></p>
//             <p className="capitalize">{status || "Pending"}</p>

//             <p><strong>Room:</strong></p>
//             <p>{room?.name || "Not specified"}</p>

//             <p><strong>Check-In:</strong></p>
//             <p>{checkIn ? new Date(checkIn).toLocaleDateString() : "N/A"}</p>

//             <p><strong>Check-Out:</strong></p>
//             <p>{checkOut ? new Date(checkOut).toLocaleDateString() : "N/A"}</p>

//             <p><strong>Guests:</strong></p>
//             <p>{guests || 0}</p>

//             <p><strong>Total Price:</strong></p>
//             <p>₹{totalPrice || 0}</p>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-center mt-8 gap-4 flex-wrap">
//           <button
//             onClick={handleDownloadVoucher}
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all"
//           >
//             Download Voucher
//           </button>

//           <button
//             onClick={() => navigate("/")}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all"
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }





















import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";

export default function BookingConfirmation() {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(location.state?.booking || null);
  const [room, setRoom] = useState(location.state?.room || null);
  const [loading, setLoading] = useState(!location.state);
  const [error, setError] = useState("");

  // Fetch booking details if user refreshed page
  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) return;

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:4000/api/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBooking(res.data.booking);
        setRoom(res.data.booking?.room || null);
      } catch (err) {
        console.error("❌ Error fetching booking:", err);
        setError("Unable to load booking details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (!booking) fetchBooking();
  }, [bookingId, booking]);

  // ✅ Generate PDF Voucher
  const handleDownloadVoucher = () => {
    if (!booking) return;

    const doc = new jsPDF("p", "pt", "a4");

    // Header bar
    doc.setFillColor(44, 62, 80);
    doc.rect(0, 0, 595, 70, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("Stayleo Hotels", 40, 45);
    doc.setFontSize(14);
    doc.text("Booking Voucher", 480, 45, { align: "right" });

    // Booking info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    let y = 110;
    const roomName = room?.name || "Not specified";

    doc.text("Booking Summary", 40, y);
    y += 25;
    doc.setFontSize(12);
    doc.text(`Booking ID: ${booking._id || "N/A"}`, 40, y);
    y += 18;
    doc.text(
      `Booking Date: ${booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "N/A"}`,
      40,
      y
    );
    y += 18;
    doc.text(`Status: ${booking.status || "Pending"}`, 40, y);
    y += 28;

    doc.setFontSize(14);
    doc.text("Stay Details", 40, y);
    y += 25;
    doc.setFontSize(12);
    doc.text(`Room: ${roomName}`, 40, y);
    y += 18;
    doc.text(
      `Check-In: ${booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : "N/A"}`,
      40,
      y
    );
    y += 18;
    doc.text(
      `Check-Out: ${booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : "N/A"}`,
      40,
      y
    );
    y += 18;
    doc.text(`Guests: ${booking.guests || 0}`, 40, y);
    y += 18;
    doc.text(`Total Price: ₹${booking.totalPrice || 0}`, 40, y);
    y += 40;

    // ✅ Grab on-screen QR code canvas
    const qrCanvasOnScreen = document.querySelector("#booking-qr canvas");
    if (qrCanvasOnScreen) {
      const qrImgData = qrCanvasOnScreen.toDataURL("image/png");
      doc.addImage(qrImgData, "PNG", 400, 120, 120, 120);
    }

    // Footer note
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "Thank you for booking with Stayleo Hotels. Please carry a valid ID proof at check-in.",
      40,
      750,
      { maxWidth: 500 }
    );

    // Save file
    doc.save(`Stayleo_Voucher_${booking._id || "Unknown"}.pdf`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading booking confirmation...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        {error}
      </div>
    );

  if (!booking)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        No booking details found.
      </div>
    );

  const { checkIn, checkOut, guests, totalPrice, createdAt, status, _id: id } = booking;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-16 px-4">
      <div className="bg-white shadow-2xl rounded-3xl max-w-2xl w-full p-10 border border-gray-100">
        <div className="text-center mb-6">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-800 mt-3">Booking Confirmed!</h1>
          <p className="text-gray-600 mt-2">
            Your booking has been successfully confirmed. A confirmation email has been sent to your registered address.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Booking Summary</h2>
          <div className="grid grid-cols-2 gap-y-3 text-gray-700">
            <p><strong>Booking ID:</strong></p><p>{id || "N/A"}</p>
            <p><strong>Booking Date:</strong></p><p>{createdAt ? new Date(createdAt).toLocaleString() : "N/A"}</p>
            <p><strong>Status:</strong></p><p className="capitalize">{status || "Pending"}</p>
            <p><strong>Room:</strong></p><p>{room?.name || "Not specified"}</p>
            <p><strong>Check-In:</strong></p><p>{checkIn ? new Date(checkIn).toLocaleDateString() : "N/A"}</p>
            <p><strong>Check-Out:</strong></p><p>{checkOut ? new Date(checkOut).toLocaleDateString() : "N/A"}</p>
            <p><strong>Guests:</strong></p><p>{guests || 0}</p>
            <p><strong>Total Price:</strong></p><p>₹{totalPrice || 0}</p>
          </div>

          {/* ✅ QR Code Display */}
          <div id="booking-qr" className="mt-8 text-center">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Booking QR Code</h3>
            <div className="flex justify-center">
              <QRCodeCanvas
                value={`Booking ID: ${booking._id}\nRoom: ${room?.name}\nCheck-In: ${new Date(
                  booking.checkIn
                ).toLocaleDateString()}\nCheck-Out: ${new Date(
                  booking.checkOut
                ).toLocaleDateString()}\nGuests: ${booking.guests}\nTotal: ₹${booking.totalPrice}`}
                size={150}
                bgColor="#ffffff"
                fgColor="#2563eb"
                level="H"
                includeMargin
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-8 gap-4 flex-wrap">
          <button
            onClick={handleDownloadVoucher}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all"
          >
            Download Voucher
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
