const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true }, // years
    rating: { type: Number, default: 4.5, min: 1, max: 5 },
    bio: { type: String, default: '' },
    image: { type: String, default: '' },
    certifications: [{ type: String }],
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trainer', trainerSchema);
