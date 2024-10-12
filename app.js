const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const secretSantaRoutes = require('./routes/secretSantaRoutes');
const { authMiddleware } = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/groups', authMiddleware, groupRoutes);
app.use('/api/secret-santa', authMiddleware, secretSantaRoutes);

// Global error handling
app.use(require('./middleware/errorHandler'));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
