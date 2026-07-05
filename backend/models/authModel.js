const pool = require("../config/db");

const findUserByEmail = async (email) => {

    const query = `
        SELECT * FROM students
        WHERE email = $1;
    `;

    const result = await pool.query(query, [email]);

    return result.rows[0];
};

const findUserById = async (id) => {

    const query = `
        SELECT
            id,
            full_name,
            email,
            phone,
            created_at
        FROM students
        WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];

};

const createUser = async (userData) => {

    const query = `
        INSERT INTO students
        (full_name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

    const values = [
        userData.name,
        userData.email,
        userData.password
    ];

    const result = await pool.query(query, values);

    const user = result.rows[0];

    const { password, ...safeUser } = result.rows[0];

    return {
        success: true,
        message: "User registered successfully!",
        user: safeUser
    };
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById
};