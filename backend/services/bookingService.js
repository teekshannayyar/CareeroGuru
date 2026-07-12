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

// Update Booking Status
const updateBookingStatus = async (
    counsellorId,
    bookingId,
    status
) => {

    const validStatuses = [
        "Accepted",
        "Rejected",
        "Completed",
        "Cancelled"
    ];

    if (!validStatuses.includes(status)) {
        throw new Error("Invalid booking status.");
    }

    // Check if booking exists
    const booking = await bookingModel.findBookingById(bookingId);

    if (!booking) {
        throw new Error("Booking not found.");
    }

    // Authorization Check
    if (booking.counsellor_id !== counsellorId) {
        throw new Error("You are not authorized to update this booking.");
    }

    const updatedBooking =
        await bookingModel.updateBookingStatus(
            bookingId,
            status
        );

    return {
        success: true,
        message: "Booking status updated successfully!",
        booking: updatedBooking
    };

};

module.exports = {
    createBooking,
    getStudentBookings,
    getCounsellorBookings,
    updateBookingStatus
};