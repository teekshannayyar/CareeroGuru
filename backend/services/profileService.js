const profileModel = require("../models/profileModel");

const createProfile = async (studentId, profileData) => {

    const {
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
    } = profileData;

    // Basic Validation
    if (!college || !degree || !graduation_year) {
        throw new Error("College, Degree and Graduation Year are required.");
    }

    return await profileModel.createProfile(studentId, {
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
    });

};

module.exports = {
    createProfile
};