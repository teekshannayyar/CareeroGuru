const pool = require("../config/db");

// Create Booking
const createBooking = async (bookingData) => {

    const query = `
        INSERT INTO bookings
        (
            student_id,
            counsellor_id,
            booking_date,
            booking_time
        )
        VALUES
        (
            $1, $2, $3, $4
        )
        RETURNING *;
    `;

    const values = [
        bookingData.student_id,
        bookingData.counsellor_id,
        bookingData.booking_date,
        bookingData.booking_time
    ];

    const result = await pool.query(query, values);

    return {
        success: true,
        message: "Booking created successfully!",
        booking: result.rows[0]
    };

};

// Check if a Time Slot is Already Booked
const findBookingBySlot = async (
    counsellorId,
    bookingDate,
    bookingTime
) => {

    const query = `
        SELECT *
        FROM bookings
        WHERE counsellor_id = $1
        AND booking_date = $2
        AND booking_time = $3;
    `;

    const values = [
        counsellorId,
        bookingDate,
        bookingTime
    ];

    const result = await pool.query(query, values);

    return result.rows[0];

};

// Get Student Bookings
const getStudentBookings = async (studentId) => {

    const query = `
        SELECT
            b.id,
            c.full_name AS counsellor_name,
            c.specialization,
            c.company,
            b.booking_date,
            b.booking_time,
            b.status
        FROM bookings b
        JOIN counsellors c
            ON b.counsellor_id = c.id
        WHERE b.student_id = $1
        ORDER BY b.booking_date, b.booking_time;
    `;

    const result = await pool.query(query, [studentId]);

    return result.rows;

};

// Get Bookings for Logged-in Counsellor
const getCounsellorBookings = async (counsellorId) => {

    const query = `
    SELECT
        b.id,
        s.full_name AS student_name,
        p.college,
        p.degree,
        b.booking_date,
        b.booking_time,
        b.status
    FROM bookings b

    JOIN students s
        ON b.student_id = s.id

    LEFT JOIN student_profiles p
        ON s.id = p.student_id

    WHERE b.counsellor_id = $1

    ORDER BY b.booking_date,
             b.booking_time;
`;

    const result = await pool.query(query, [counsellorId]);

    return result.rows;

};

module.exports = {
    createBooking,
    findBookingBySlot,
    getStudentBookings,
    getCounsellorBookings
};