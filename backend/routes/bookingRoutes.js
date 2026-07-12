const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    createBooking,
    getStudentBookings,
    getCounsellorBookings
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

// Counsellor Routes
router.get("/counsellor", verifyToken, getCounsellorBookings);

module.exports = router;