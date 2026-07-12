const counsellorService = require("../services/counsellorService");

// Register Counsellor
const registerCounsellor = async (req, res) => {

    try {

        const result = await counsellorService.registerCounsellor(req.body);

        res.status(201).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Login Counsellor
const loginCounsellor = async (req, res) => {

    try {

        const result = await counsellorService.loginCounsellor(req.body);

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Counsellor Profile
const getCounsellorProfile = async (req, res) => {

    try {

        const result = await counsellorService.getCounsellorProfile(req.user.id);

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Counsellor Profile
const updateCounsellorProfile = async (req, res) => {

    try {

        const result = await counsellorService.updateCounsellorProfile(
            req.user.id,
            req.body
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Counsellors
const getAllCounsellors = async (req, res) => {

    try {

        const result = await counsellorService.getAllCounsellors();

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Counsellor By ID (Public)
const getCounsellorById = async (req, res) => {

    try {

        const result = await counsellorService.getCounsellorById(req.params.id);

        res.status(200).json(result);

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    registerCounsellor,
    loginCounsellor,
    getCounsellorProfile,
    updateCounsellorProfile,
    getAllCounsellors,
    getCounsellorById
};