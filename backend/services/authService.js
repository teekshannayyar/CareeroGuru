const bcrypt = require("bcrypt");
const authModel = require("../models/authModel");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {

    const { name, email, password } = userData;

    // Validation
    if (!name || !email || !password) {
        throw new Error("All fields are required.");
    }

    const existingUser = await authModel.findUserByEmail(email);

    if (existingUser) {
        throw new Error("Email already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        ...userData,
        password: hashedPassword
    };



    return await authModel.createUser(newUser);
};

const loginUser = async (userData) => {

    const { email, password } = userData;

    if (!email || !password) {
        throw new Error("Email and Password are required.");
    }

    // Find user
    const user = await authModel.findUserByEmail(email);

    if (!user) {
        throw new Error("User not found.");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid password.");
    }

    delete user.password;

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
    return {
        success: true,
        message: "Login Successful!",
        token,
        user
    };
};

module.exports = {
    registerUser,
    loginUser
};