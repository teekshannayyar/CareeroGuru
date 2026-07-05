const pool = require("../config/db");

const findUserByEmail = async (email) => {

    const query = `
        SELECT * FROM students
        WHERE email = $1;
    `;

    const result = await pool.query(query, [email]);

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

delete user.password;

return {
    success: true,
    message: "User registered successfully!",
    user
};
};

module.exports = {
    createUser,
    findUserByEmail
};