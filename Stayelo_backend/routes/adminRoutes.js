// const express = require('express');
// const Room = require('../modals/RoomData');
// const Booking = require('../modals/Booking');
// const { authenticateToken, requireRole } = require('../utils/authMiddleware');
// const cloudinary = require('../utils/cloudinary');
// const multer = require('multer');

// const router = express.Router();

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Admin add/edit/delete rooms
// router.post('/rooms', authenticateToken, requireRole('ADMIN'), upload.array('images', 5), async (req, res) => {
//   try {
//     const imageUploadPromises = req.files.map(file =>
//       cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
//         if (error) throw error;
//         return result;
//       }).end(file.buffer)
//     );

//     const uploadResults = await Promise.all(imageUploadPromises);
//     const imageUrls = uploadResults.map(r => r.secure_url);

//     const { type, price, available } = req.body;
//     const room = new Room({ type, price, available: available === 'true', images: imageUrls });
//     await room.save();

//     res.status(201).json(room);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Admin dashboard: bookings and revenue
// router.get('/dashboard', authenticateToken, requireRole('ADMIN'), async (req, res) => {
//   try {
//     const bookings = await Booking.find({ status: 'CONFIRMED' }).populate('room');
//     const totalRevenue = bookings.reduce((acc, b) => acc + b.room.price, 0);
//     res.json({
//       totalBookings: bookings.length,
//       totalRevenue,
//       bookings,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Placeholder for monthly reports

// router.get('/reports/monthly', authenticateToken, requireRole('ADMIN'), async (req, res) => {
//   res.status(501).json({ message: 'Monthly report generation not implemented yet.' });
// });

// module.exports = router;



const express = require("express");
const Room = require("../modals/RoomData");
const Booking = require("../modals/Booking");
const { authenticateToken, requireRole } = require("../utils/authMiddleware");
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");
const PDFDocument = require("pdfkit");

const router = express.Router();

// Configure Multer for in-memory upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper function for Cloudinary upload
const uploadImage = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

/* ============================================================
   ✅ ADD NEW ROOM (Admin only)
   ============================================================ */
// router.post(
//   "/",
//   authenticateToken,
//   requireRole("ADMIN"),
//   upload.array("images", 5),
//   async (req, res) => {
//     try {
//       if (!req.files || req.files.length === 0) {
//         return res.status(400).json({ error: "No images uploaded" });
//       }

//       const imageUploadPromises = req.files.map((file) =>
//         uploadImage(file.buffer)
//       );
//       const uploadResults = await Promise.all(imageUploadPromises);
//       const imageUrls = uploadResults.map((r) => r.secure_url);

//       const { type, price, available } = req.body;

//       if (!type || !price) {
//         return res.status(400).json({ error: "Type and price are required" });
//       }

//       const room = new Room({
//         type,
//         price,
//         available: available === "true",
//         images: imageUrls,
//       });

//       await room.save();
//       res.status(201).json({ message: "Room added successfully", room });
//     } catch (err) {
//       console.error("❌ Error adding room:", err);
//       res.status(500).json({ error: err.message });
//     }
//   }
// );

// /* ============================================================
//    ✅ FETCH ALL ROOMS (Admin only)
//    ============================================================ */
// router.get("/", authenticateToken, requireRole("ADMIN"), async (req, res) => {
//   try {
//     const rooms = await Room.find().sort({ createdAt: -1 });
//     res.json(rooms);
//   } catch (err) {
//     console.error("❌ Error fetching rooms:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

/* ============================================================
   ✅ ADMIN DASHBOARD: BOOKINGS + REVENUE
   ============================================================ */
router.get(
  "/dashboard",
  authenticateToken,
  requireRole("ADMIN"),
  async (req, res) => {
    try {
      const bookings = await Booking.find({ status: "CONFIRMED" }).populate(
        "room"
      );

      const totalRevenue = bookings.reduce((acc, b) => {
        if (b.room && b.room.price) return acc + b.room.price;
        return acc;
      }, 0);

      res.json({
        totalBookings: bookings.length,
        totalRevenue,
        bookings,
      });
    } catch (err) {
      console.error("❌ Dashboard Error:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

/* ============================================================
   ✅ MONTHLY REPORT (PDF Download)
   ============================================================ */
router.get(
  "/reports/monthly",
  authenticateToken,
  requireRole("ADMIN"),
  async (req, res) => {
    try {
      const { year, month } = req.query;
      const now = new Date();
      const yearNum = parseInt(year) || now.getFullYear();
      const monthNum = parseInt(month) || now.getMonth() + 1;
      const startDate = new Date(yearNum, monthNum - 1, 1);
      const endDate = new Date(yearNum, monthNum, 0, 23, 59, 59);

      const bookings = await Booking.find({
        status: "CONFIRMED",
        checkIn: { $gte: startDate, $lte: endDate },
      }).populate("room");

      const totalRevenue = bookings.reduce(
        (acc, b) => (b.room ? acc + b.room.price : acc),
        0
      );

      const totalBookings = bookings.length;
      const doc = new PDFDocument();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=monthly_report_${yearNum}_${monthNum}.pdf`
      );

      doc.pipe(res);
      doc
        .fontSize(16)
        .text(`Monthly Report for ${monthNum}/${yearNum}`, {
          align: "center",
          underline: true,
        });
      doc.moveDown();
      doc.fontSize(12).text(`Total Bookings: ${totalBookings}`);
      doc.text(`Total Revenue: $${totalRevenue.toFixed(2)}`);
      doc.end();
    } catch (error) {
      console.error("❌ Monthly Report Error:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
