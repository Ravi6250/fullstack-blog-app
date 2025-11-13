// server/models/Post.js

const mongoose = require('mongoose');

// Create the Schema for posts
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 120
    },
    imageURL: {
        type: String,
        required: false // This field is optional
    },
    content: {
        type: String,
        required: true,
        minlength: 50
    },
    // This establishes the link between a Post and a User
    author: {
        type: mongoose.Schema.Types.ObjectId, // Stores the unique ID of a user
        ref: 'User',                           // Tells Mongoose this ID refers to the 'User' model
        required: true
    },
    // This is denormalized data to make fetching post lists faster
    username: {
        type: String,
        required: true
    }
}, { timestamps: true }); // This automatically adds `createdAt` and `updatedAt` fields

// Create and export the Post model.
// Mongoose will create a collection named "posts" in your MongoDB.
module.exports = mongoose.model('Post', PostSchema);