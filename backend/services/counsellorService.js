const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const counsellorModel = require("../models/counsellorModel");

// Register Counsellor
const registerCounsellor = async (counsellorData) => {

    const { name, email, password } = counsellorData;

    if (!name || !email || !password) {
        throw new Error("All fields are required.");
    }

    const existingCounsellor = await counsellorModel.findCounsellorByEmail(email);

    if (existingCounsellor) {
        throw new Error("Email already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCounsellor = {
        ...counsellorData,
        password: hashedPassword
    };

    return await counsellorModel.createCounsellor(newCounsellor);

};

// Login Counsellor
const loginCounsellor = async (counsellorData) => {

    const { email, password } = counsellorData;

    if (!email || !password) {
        throw new Error("Email and Password are required.");
    }

    const counsellor = await counsellorModel.findCounsellorByEmail(email);

    if (!counsellor) {
        throw new Error("Counsellor not found.");
    }

    const isMatch = await bcrypt.compare(password, counsellor.password);

    if (!isMatch) {
        throw new Error("Invalid password.");
    }

    delete counsellor.password;

    const token = jwt.sign(
        {
            id: counsellor.id,
            email: counsellor.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return {
        success: true,
        message: "Login Successful!",
        token,
        counsellor
    };

};

// Get Counsellor Profile
const getCounsellorProfile = async (id) => {

    const counsellor = await counsellorModel.findCounsellorById(id);

    if (!counsellor) {
        throw new Error("Counsellor not found.");
    }

    return {
        success: true,
        counsellor
    };

};

// Update Counsellor Profile
const updateCounsellorProfile = async (counsellorId, profileData) => {

    const {
        phone,
        experience,
        company,
        designation,
        specialization,
        bio,
        linkedin_url,
        consultation_fee
    } = profileData;

    // Basic Validation
    if (!experience || !company || !designation || !specialization) {
        throw new Error(
            "Experience, Company, Designation and Specialization are required."
        );
    }

    return await counsellorModel.updateCounsellorProfile(
        counsellorId,
        {
            phone,
            experience,
            company,
            designation,
            specialization,
            bio,
            linkedin_url,
            consultation_fee
        }
    );

};

// Get All Counsellors
const getAllCounsellors = async () => {

    const counsellors = await counsellorModel.getAllCounsellors();

    return {
        success: true,
        counsellors
    };

};

// Get Counsellor By ID (Public)
const getCounsellorById = async (id) => {

    const counsellor = await counsellorModel.getCounsellorById(id);

    if (!counsellor) {
        throw new Error("Counsellor not found.");
    }

    return {
        success: true,
        counsellor
    };

};

module.exports = {
    registerCounsellor,
    loginCounsellor,
    getCounsellorProfile,
    updateCounsellorProfile,
    getAllCounsellors,
    getCounsellorById
};