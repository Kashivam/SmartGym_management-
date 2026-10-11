const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const membershipRoutes = require('./routes/membership');
const bookingRoutes = require('./routes/booking');
const trainerRoutes = require('./routes/trainer');
const userRoutes = require('./routes/user');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.json({ message: 'ApexGym API Running 🏋️' }));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/apexgym';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
