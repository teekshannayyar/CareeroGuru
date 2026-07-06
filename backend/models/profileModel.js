const pool = require("../config/db");

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

module.exports = {
    createProfile
};