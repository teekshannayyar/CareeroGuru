const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    createBooking,
    getStudentBookings,
    getCounsellorBookings,
    updateBookingStatus
} = require("../controllers/bookingController");

// Create Booking
router.post(
    "/",
    verifyToken,
    createBooking
);

// Get Logged-in Student Bookings
router.get(
    "/my-bookings",
    verifyToken,
    getStudentBookings
);

// Update Booking Status
router.put(
    "/:id/status",
    verifyToken,
    updateBookingStatus
);

// Counsellor Routes
router.get("/counsellor", verifyToken, getCounsellorBookings);

module.exports = router;