const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const testRoutes = require("./routes/testRoutes");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const counsellorRoutes = require("./routes/counsellorRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Routes
app.use("/api", testRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/counsellor", counsellorRoutes);
app.use("/api/bookings", bookingRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("🎉 Welcome to CareeroGuru Backend!");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});