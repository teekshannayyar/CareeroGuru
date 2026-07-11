const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    registerCounsellor,
    loginCounsellor,
    getCounsellorProfile
} = require("../controllers/counsellorController");

// Public Routes
router.post("/register", registerCounsellor);
router.post("/login", loginCounsellor);

// Protected Route
router.get("/profile", verifyToken, getCounsellorProfile);

module.exports = router;