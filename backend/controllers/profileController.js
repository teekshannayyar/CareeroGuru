const profileService = require("../services/profileService");

const updateProfile = async (req, res) => {

    try {

        console.log("Logged in User ID:", req.user.id);

        const result = await profileService.updateProfile(
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

const getProfile = async (req, res) => {

    try {

        const result = await profileService.getProfile(req.user.id);

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    updateProfile,
    getProfile
};