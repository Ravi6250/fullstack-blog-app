const Post = require('../models/Post');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.createPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', details: errors.array() });
    }

    const { title, imageURL, content } = req.body;

    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newPost = new Post({
            title,
            imageURL,
            content,
            author: req.user.userId,
            username: user.username,
        });

        const post = await newPost.save();
        res.status(201).json(post);
    } catch (err) {
        console.error('Error in createPost:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';

        const query = search ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { username: { $regex: search, $options: 'i' } }
            ]
        } : {};

        const posts = await Post.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const count = await Post.countDocuments(query);

        res.json({
            posts,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (err) {
        console.error('Error in getAllPosts:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        console.error('Error in getPostById:', err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getUserPosts = async (req, res) => {
    try {
        const userId = req.user.userId;
        const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.error('Error in getUserPosts:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updatePost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', details: errors.array() });
    }

    const { title, imageURL, content } = req.body;

    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'User not authorized' });
        }

        post.title = title;
        post.imageURL = imageURL;
        post.content = content;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        console.error('Error in updatePost:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'User not authorized' });
        }

        await Post.findByIdAndDelete(req.params.id);

        res.json({ message: 'Post removed successfully' });
    } catch (err) {
        console.error('Error in deletePost:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};