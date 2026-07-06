const profileService = require("../services/profileService");

const createProfile = async (req, res) => {

    try {

        const result = await profileService.createProfile(
            req.user.id,
            req.body
        );

        res.status(201).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createProfile
};