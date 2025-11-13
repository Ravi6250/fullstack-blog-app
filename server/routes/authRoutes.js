// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// Import the controller functions
const { register, login } = require('../controllers/authController');

// =================================================================
//                          ROUTES
// =================================================================

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
    '/register',
    // --- Validation Rules ---
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    ],
    // --- Controller Function ---
    register
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/login',
    // --- Validation Rules ---
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    // --- Controller Function ---
    login
);

module.exports = router;