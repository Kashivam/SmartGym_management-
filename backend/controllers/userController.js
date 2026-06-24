const User = require('../models/User');
const Booking = require('../models/Booking');
const Membership = require('../models/Membership');

// GET /api/users/dashboard
const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    const bookings = await Booking.find({ user: req.user._id, status: 'confirmed' }).sort({ createdAt: -1 });
    const membership = await Membership.findOne({ user: req.user._id, status: 'active' });

    res.json({ user, bookings, membership });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDashboard };
