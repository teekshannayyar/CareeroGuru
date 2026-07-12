const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    createBooking,
    getStudentBookings,
    getCounsellorBookings,
    updateBookingStatus,
    cancelBooking
} = require("../controllers/bookingController");

// Student Routes
router.post("/", verifyToken, createBooking);

router.get(
    "/my-bookings",
    verifyToken,
    getStudentBookings
);

router.put(
    "/:id/cancel",
    verifyToken,
    cancelBooking
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
router.get(
    "/counsellor",
    verifyToken,
    getCounsellorBookings
);

router.put(
    "/:id/status",
    verifyToken,
    updateBookingStatus
);

module.exports = router;