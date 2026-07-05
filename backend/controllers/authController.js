const authService = require("../services/authService");

const registerUser = async (req, res) => {
    try {
        const result = await authService.registerUser(req.body);

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const loginUser = async (req, res) => {

    try {

        const result = await authService.loginUser(req.body);

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getProfile = async (req, res) => {

    try {

        const result = await authService.getProfile(req.user.id);

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    registerUser,
    loginUser,
    getProfile
};