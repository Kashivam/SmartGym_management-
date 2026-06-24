const express = require('express');
const router = express.Router();
const { getSlots, createBooking, cancelBooking, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

// Middleware to optionally attach user if token present
const optionalAuth = async (req, res, next) => {
  const jwt = require('jsonwebtoken');
  const User = require('../models/User');
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (_) {}
  }
  next();
};

router.get('/slots', optionalAuth, getSlots);
router.post('/', protect, createBooking);
router.delete('/:id', protect, cancelBooking);
router.get('/my', protect, getMyBookings);

module.exports = router;
