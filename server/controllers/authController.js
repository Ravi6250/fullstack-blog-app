// server/controllers/authController.js

// 1. Import necessary packages and models
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// ===================================
//  Function to REGISTER a new user
// ===================================
exports.register = async (req, res) => {
    // Check for validation errors defined in the route
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', details: errors.array() });
    }

    // Get user details from the request body
    const { username, email, password } = req.body;

    try {
        // A. Check if user already exists in the database
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // B. If user does not exist, create a new user instance
        user = new User({
            username,
            email,
            password, // Password will be hashed by the pre-save hook in User.js
        });

        // C. Save the new user to the database
        await user.save();

        // D. Create a JWT payload
        const payload = {
            userId: user.id, // The unique ID from the database
            username: user.username
        };

        // E. Sign the token with your secret key
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET, // Your secret key from the .env file
            { expiresIn: '3h' }     // Token will be valid for 3 hours
        );

        // F. Send the token back to the client
        res.status(201).json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// ===================================
//  Function to LOGIN an existing user
// ===================================
exports.login = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', details: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // A. Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // B. Compare the provided password with the hashed password in the DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // C. If passwords match, create and sign a new JWT
        const payload = {
            userId: user.id,
            username: user.username
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );

        // D. Send the token back
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};