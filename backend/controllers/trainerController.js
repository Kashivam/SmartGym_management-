const Trainer = require('../models/Trainer');

// GET /api/trainers
const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find({ available: true });
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getTrainers };
