const profileModel = require("../models/profileModel");

// Get Student Profile
const getProfile = async (studentId) => {
    return await profileModel.getProfile(studentId);
};

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

// Upload Resume
const updateResume = async (studentId, resumePath) => {

    if (!resumePath) {
        throw new Error("Resume file is required.");
    }

    return await profileModel.updateResume(studentId, resumePath);

};

module.exports = {
    getProfile,
    updateProfile,
    updateResume
};