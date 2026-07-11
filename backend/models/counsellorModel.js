const pool = require("../config/db");

// Find counsellor by email
const findCounsellorByEmail = async (email) => {

    const query = `
        SELECT *
        FROM counsellors
        WHERE email = $1;
    `;

    const result = await pool.query(query, [email]);

    return result.rows[0];

};

// Create counsellor
const createCounsellor = async (counsellorData) => {

    const query = `
        INSERT INTO counsellors
        (
            full_name,
            email,
            password
        )
        VALUES
        (
            $1, $2, $3
        )
        RETURNING *;
    `;

    const values = [
        counsellorData.name,
        counsellorData.email,
        counsellorData.password
    ];

    const result = await pool.query(query, values);

    const counsellor = result.rows[0];

    delete counsellor.password;

    return {
        success: true,
        message: "Counsellor registered successfully!",
        counsellor
    };

};

// Find counsellor by ID
const findCounsellorById = async (id) => {

    const query = `
        SELECT
            id,
            full_name,
            email,
            phone,
            experience,
            company,
            designation,
            specialization,
            bio,
            linkedin_url,
            consultation_fee,
            created_at
        FROM counsellors
        WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];

};

module.exports = {
    createCounsellor,
    findCounsellorByEmail,
    findCounsellorById
};