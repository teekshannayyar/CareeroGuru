const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    updateProfile,
    getProfile
} = require("../controllers/profileController");

// Get Logged-in User Profile
router.get("/", verifyToken, getProfile);

// Update Profile
router.put("/", verifyToken, updateProfile);

module.exports = router;