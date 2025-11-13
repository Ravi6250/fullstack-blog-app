const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const auth = require('../middleware/authMiddleware');

const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getUserPosts
} = require('../controllers/postController');

const postValidationRules = [
    check('title', 'Title is required and must be between 5 and 120 characters').isLength({ min: 5, max: 120 }),
    check('content', 'Content is required and must be at least 50 characters').isLength({ min: 50 }),
    check('imageURL', 'Please provide a valid URL for the image').optional().isURL(),
];


// --- DEFINE ROUTES HERE ---

// @route   POST api/posts
// @desc    Create a new post
// @access  Private
router.post('/', auth, postValidationRules, createPost);

// @route   GET api/posts
// @desc    Get all posts (with pagination & search)
// @access  Public
router.get('/', getAllPosts);

// --- IMPORTANT: Specific routes must come BEFORE dynamic routes ---

// @route   GET api/posts/my-posts
// @desc    Get all posts for the logged-in user
// @access  Private
router.get('/my-posts', auth, getUserPosts);

// @route   GET api/posts/:id
// @desc    Get a single post by its ID
// @access  Public
// This dynamic route MUST come after '/my-posts'
router.get('/:id', getPostById);

// @route   PUT api/posts/:id
// @desc    Update a user's own post
// @access  Private
router.put('/:id', auth, postValidationRules, updatePost);

// @route   DELETE api/posts/:id
// @desc    Delete a user's own post
// @access  Private
router.delete('/:id', auth, deletePost);


module.exports = router;