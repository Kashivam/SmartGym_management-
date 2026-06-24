const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
    },
    timeSlot: { type: String, required: true }, // e.g. "06:00 AM"
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
    maxCapacity: { type: Number, default: 20 },
  },
  { timestamps: true }
);

// Prevent double booking (same user, day, time)
bookingSchema.index({ user: 1, day: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
