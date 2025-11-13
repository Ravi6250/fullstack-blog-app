const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { register, login } = require('../controllers/authController');

console.log("LOG: authRoutes.js file has been loaded and is being processed.");

// @route   POST /api/auth/register
router.post(
    '/register',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    ],
    register
);

// @route   POST /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    login
);

module.exports = router;