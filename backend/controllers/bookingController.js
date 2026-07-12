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

module.exports = {
    createBooking,
    getStudentBookings,
    getCounsellorBookings
};