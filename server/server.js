
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


app.use(cors());


app.use(express.json());

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in the .env file.');
    process.exit(1); // Exit the application with a failure code
}

mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB Connected Successfully...');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

app.get('/', (req, res) => {
    res.send('Full-Stack Blog API is running...');
});

// All routes starting with '/api/auth' will be handled by the authRoutes file.
app.use('/api/auth', require('./routes/authRoutes'));

// All routes starting with '/api/posts' will be handled by the postRoutes file.
app.use('/api/posts', require('./routes/postRoutes'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});