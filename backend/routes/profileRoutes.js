const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    updateProfile,
    updateResume
} = require("../controllers/profileController");

// Update Student Profile
router.put("/update", verifyToken, updateProfile);

// Upload Resume
router.put(
    "/resume",
    verifyToken,
    upload.single("resume"),
    updateResume
);

module.exports = router;