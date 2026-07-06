const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    updateProfile
} = require("../controllers/profileController");

// Update Profile
router.put("/", verifyToken, updateProfile);

module.exports = router;