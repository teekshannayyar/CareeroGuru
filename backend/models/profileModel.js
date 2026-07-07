const pool = require("../config/db");

// Automatically create an empty profile after registration
const createEmptyProfile = async (studentId) => {

    const query = `
        INSERT INTO student_profiles (student_id)
        VALUES ($1);
    `;

    await pool.query(query, [studentId]);

};

const createProfile = async (studentId, profileData) => {

    const query = `
        INSERT INTO student_profiles
        (
            student_id,
            phone,
            college,
            degree,
            graduation_year,
            skills,
            career_interest,
            bio,
            linkedin_url,
            github_url,
            resume_url
        )
        VALUES
        (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10, $11
        )
        RETURNING *;
    `;

    const values = [
        studentId,
        profileData.phone,
        profileData.college,
        profileData.degree,
        profileData.graduation_year,
        profileData.skills,
        profileData.career_interest,
        profileData.bio,
        profileData.linkedin_url,
        profileData.github_url,
        profileData.resume_url
    ];

    const result = await pool.query(query, values);

    return {
        success: true,
        message: "Profile created successfully!",
        profile: result.rows[0]
    };

};

const updateProfile = async (studentId, profileData) => {

    const query = `
        UPDATE student_profiles
        SET
            phone = $1,
            college = $2,
            degree = $3,
            graduation_year = $4,
            skills = $5,
            career_interest = $6,
            bio = $7,
            linkedin_url = $8,
            github_url = $9,
            resume_url = $10,
            updated_at = CURRENT_TIMESTAMP
        WHERE student_id = $11
        RETURNING *;
    `;

    const values = [
        profileData.phone,
        profileData.college,
        profileData.degree,
        profileData.graduation_year,
        profileData.skills,
        profileData.career_interest,
        profileData.bio,
        profileData.linkedin_url,
        profileData.github_url,
        profileData.resume_url,
        studentId
    ];

    const result = await pool.query(query, values);
    console.log("Rows Updated:", result.rowCount);
    console.log("Result:", result.rows);

    return {
        success: true,
        message: "Profile updated successfully!",
        profile: result.rows[0]
    };

};

const getProfile = async (studentId) => {

    const query = `
        SELECT
            s.id,
            s.full_name,
            s.email,
            p.phone,
            p.college,
            p.degree,
            p.graduation_year,
            p.skills,
            p.career_interest,
            p.bio,
            p.linkedin_url,
            p.github_url,
            p.resume_url,
            p.updated_at
        FROM students s
        JOIN student_profiles p
        ON s.id = p.student_id
        WHERE s.id = $1;
    `;

    const result = await pool.query(query, [studentId]);

    return {
        success: true,
        profile: result.rows[0]
    };

};

const updateResume = async (studentId, resumePath) => {

    const query = `
        UPDATE student_profiles
        SET
            resume_url = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE student_id = $2
        RETURNING *;
    `;

    const values = [
        resumePath,
        studentId
    ];

    const result = await pool.query(query, values);

    return {
        success: true,
        message: "Resume uploaded successfully!",
        profile: result.rows[0]
    };

};

module.exports = {
    createProfile,
    createEmptyProfile,
    updateProfile,
    getProfile,
    updateResume
};