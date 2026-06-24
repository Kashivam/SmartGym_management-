const Booking = require('../models/Booking');

const MAX_CAPACITY = 20;

const TIME_SLOTS = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM',
  '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM',
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// GET /api/bookings/slots?day=Monday
const getSlots = async (req, res) => {
  try {
    const { day } = req.query;
    if (!day || !DAYS.includes(day))
      return res.status(400).json({ message: 'Invalid day' });

    // Count confirmed bookings per slot for this day
    const bookingCounts = await Booking.aggregate([
      { $match: { day, status: 'confirmed' } },
      { $group: { _id: '$timeSlot', count: { $sum: 1 } } },
    ]);

    const countMap = {};
    bookingCounts.forEach((b) => (countMap[b._id] = b.count));

    // Get user's existing bookings for this day
    let userBookedSlots = [];
    if (req.user) {
      const userBookings = await Booking.find({
        user: req.user._id,
        day,
        status: 'confirmed',
      });
      userBookedSlots = userBookings.map((b) => b.timeSlot);
    }

    const slots = TIME_SLOTS.map((slot) => ({
      time: slot,
      booked: countMap[slot] >= MAX_CAPACITY,
      count: countMap[slot] || 0,
      capacity: MAX_CAPACITY,
      userBooked: userBookedSlots.includes(slot),
    }));

    res.json({ day, slots });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const { day, timeSlot } = req.body;
    if (!day || !timeSlot) return res.status(400).json({ message: 'Day and time slot required' });
    if (!DAYS.includes(day)) return res.status(400).json({ message: 'Invalid day' });
    if (!TIME_SLOTS.includes(timeSlot)) return res.status(400).json({ message: 'Invalid time slot' });

    // Check capacity
    const count = await Booking.countDocuments({ day, timeSlot, status: 'confirmed' });
    if (count >= MAX_CAPACITY)
      return res.status(409).json({ message: 'Slot is fully booked' });

    // Check double booking
    const existing = await Booking.findOne({
      user: req.user._id,
      day,
      timeSlot,
      status: 'confirmed',
    });
    if (existing) return res.status(409).json({ message: 'You already booked this slot' });

    const booking = await Booking.create({
      user: req.user._id,
      day,
      timeSlot,
    });

    res.status(201).json({ message: 'Slot booked successfully!', booking });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'You already booked this slot' });
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/bookings/:id
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/bookings/my
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getSlots, createBooking, cancelBooking, getMyBookings };
