// server/models/User.js

// 1. Import necessary libraries
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // We need this to hash the password

// 2. Create the Schema (the blueprint)
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // This field cannot be empty
        unique: true      // Every user must have a unique username
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true }); // `timestamps: true` automatically adds `createdAt` and `updatedAt` fields

// 3. Mongoose "Middleware" to hash the password BEFORE saving
// This is a special function that runs just before a new user is saved to the database.
UserSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }

    // Generate a "salt" - random characters to make the hash more secure
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password with the salt and replace the plain text password
    this.password = await bcrypt.hash(this.password, salt);
    
    // Continue with the save operation
    next();
});

// 4. Create and export the model
// Mongoose will create a collection called "users" (plural and lowercase) from this model.
module.exports = mongoose.model('User', UserSchema);