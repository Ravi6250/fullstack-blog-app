require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in the .env file. The server cannot start.');
    process.exit(1);
}
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected Successfully...'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// --- ROUTES ---
console.log("LOG: Attempting to load /api/auth routes...");
app.use('/api/auth', require('./routes/authRoutes'));
console.log("LOG: /api/auth routes configured.");

console.log("LOG: Attempting to load /api/posts routes...");
app.use('/api/posts', require('./routes/postRoutes'));
console.log("LOG: /api/posts routes configured.");

app.get('/', (req, res) => {
    res.send('Full-Stack Blog API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});