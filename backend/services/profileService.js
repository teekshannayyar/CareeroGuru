const profileModel = require("../models/profileModel");

// Update Student Profile
const updateProfile = async (studentId, profileData) => {

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

    return await profileModel.updateProfile(studentId, {
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

const getProfile = async (studentId) => {

    const result = await profileModel.getProfile(studentId);

    if (!result.profile) {
        throw new Error("Profile not found.");
    }

    return result;

};

module.exports = {
    updateProfile,
    getProfile
};