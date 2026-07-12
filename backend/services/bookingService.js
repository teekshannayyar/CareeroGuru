const bookingModel = require("../models/bookingModel");

// Create Booking
const createBooking = async (studentId, bookingData) => {

    const {
        counsellor_id,
        booking_date,
        booking_time
    } = bookingData;

    // Basic Validation
    if (!counsellor_id || !booking_date || !booking_time) {
        throw new Error(
            "Counsellor, Booking Date and Booking Time are required."
        );
    }

    // Check if slot is already booked
    const existingBooking = await bookingModel.findBookingBySlot(
        counsellor_id,
        booking_date,
        booking_time
    );

    if (existingBooking) {
        throw new Error("This time slot is already booked.");
    }

    // Create Booking
    return await bookingModel.createBooking({
        student_id: studentId,
        counsellor_id,
        booking_date,
        booking_time
    });

};

// Get Student Bookings
const getStudentBookings = async (studentId) => {

    const bookings = await bookingModel.getStudentBookings(studentId);

    return {
        success: true,
        bookings
    };

};

// Get Counsellor Bookings
const getCounsellorBookings = async (counsellorId) => {

    const bookings = await bookingModel.getCounsellorBookings(
        counsellorId
    );

    return {
        success: true,
        bookings
    };

};

module.exports = {
    createBooking,
    getStudentBookings,
    getCounsellorBookings
};