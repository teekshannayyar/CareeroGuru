const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const verifyToken = require("../middleware/authMiddleware");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.get("/profile", verifyToken, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Protected Route Accessed Successfully!",
        user: req.user
    });
});

module.exports = router;