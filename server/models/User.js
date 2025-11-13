const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
}, { timestamps: true });

// This "pre-save hook" is the most important part for passwords.
// It automatically runs BEFORE a user document is saved to the database.
UserSchema.pre('save', async function(next) {
    // We only want to re-hash the password if it's being created or modified.
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Generate a "salt" to make the hash more secure
        const salt = await bcrypt.genSalt(10);
        // Hash the plain-text password and replace it
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', UserSchema);