const bookingService = require("../services/bookingService");

// Create Booking
const createBooking = async (req, res) => {

    try {

        const result = await bookingService.createBooking(
            req.user.id,
            req.body
        );

        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// Get Student Bookings
const getStudentBookings = async (req, res) => {

    try {

        const result = await bookingService.getStudentBookings(
            req.user.id
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Counsellor Bookings
const getCounsellorBookings = async (req, res) => {

    try {

        const result = await bookingService.getCounsellorBookings(
            req.user.id
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Booking Status
const updateBookingStatus = async (req, res) => {

    try {

        const result = await bookingService.updateBookingStatus(
            req.user.id,
            req.params.id,
            req.body.status
        );

        res.status(200).json(result);

    } catch (error) {

        // Better error handling
        if (error.message === "Booking not found.") {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        if (error.message === "You are not authorized to update this booking.") {
            return res.status(403).json({
                success: false,
                message: error.message
            });
        }

        if (error.message === "Invalid booking status.") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Cancel Booking
const cancelBooking = async (req, res) => {

    try {

        const result = await bookingService.cancelBooking(
            req.user.id,
            req.params.id
        );

        res.status(200).json(result);

    } catch (error) {

        if (error.message === "Booking not found.") {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        if (error.message === "You are not authorized to cancel this booking.") {
            return res.status(403).json({
                success: false,
                message: error.message
            });
        }

        if (
            error.message ===
            "Only Pending or Accepted bookings can be cancelled."
        ) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createBooking,
    getStudentBookings,
    getCounsellorBookings,
    updateBookingStatus,
    cancelBooking
};