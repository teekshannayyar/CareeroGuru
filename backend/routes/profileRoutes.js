const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    createProfile
} = require("../controllers/profileController");

// Create Profile
router.post("/", verifyToken, createProfile);

module.exports = router;