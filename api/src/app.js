const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const memberRoutes = require('./routes/memberRoutes');
const secretSantaRoutes = require('./routes/secretSantaRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/groups/:groupId/members', memberRoutes);
app.use('/api/groups/:groupId/secret-santa', secretSantaRoutes);

app.use(errorMiddleware);

module.exports = app;