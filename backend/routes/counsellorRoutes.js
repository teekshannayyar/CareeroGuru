const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    registerCounsellor,
    loginCounsellor,
    getCounsellorProfile,
    updateCounsellorProfile
} = require("../controllers/counsellorController");

// Public Routes
router.post("/register", registerCounsellor);
router.post("/login", loginCounsellor);

// Protected Routes
router.get("/profile", verifyToken, getCounsellorProfile);

router.put("/update", verifyToken, updateCounsellorProfile);

module.exports = router;