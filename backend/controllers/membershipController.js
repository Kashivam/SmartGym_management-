const Membership = require('../models/Membership');
const User = require('../models/User');

const PLANS = [
  {
    name: 'Basic',
    price: 1099,
    duration: 30,
    features: [
      'Access to gym floor',
      'Locker room access',
      'Basic equipment use',
      '2 group classes/month',
      'Fitness assessment',
    ],
  },
  {
    name: 'Pro',
    price: 2000,
    duration: 30,
    features: [
      'All Basic features',
      'Unlimited group classes',
      'Personal trainer (2x/month)',
      'Nutrition consultation',
      'Priority slot booking',
      'Sauna access',
    ],
  },
  {
    name: 'Elite',
    price: 3000,
    duration: 30,
    features: [
      'All Pro features',
      'Dedicated personal trainer',
      'Unlimited personal sessions',
      'Diet & meal planning',
      'Supplement discounts',
      '24/7 gym access',
      'Guest passes (2/month)',
    ],
  },
];

// GET /api/memberships/plans
const getPlans = (req, res) => res.json(PLANS);

// POST /api/memberships/purchase
const purchaseMembership = async (req, res) => {
  try {
    const { plan } = req.body;
    const selectedPlan = PLANS.find((p) => p.name === plan);
    if (!selectedPlan) return res.status(400).json({ message: 'Invalid plan selected' });

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + selectedPlan.duration);

    // Deactivate existing membership
    await Membership.updateMany(
      { user: req.user._id, status: 'active' },
      { status: 'expired' }
    );

    const membership = await Membership.create({
      user: req.user._id,
      plan: selectedPlan.name,
      price: selectedPlan.price,
      features: selectedPlan.features,
      endDate,
    });

    await User.findByIdAndUpdate(req.user._id, { activeMembership: membership._id });

    res.status(201).json({ message: `${plan} plan activated!`, membership });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/memberships/my
const getMyMembership = async (req, res) => {
  try {
    const membership = await Membership.findOne({
      user: req.user._id,
      status: 'active',
    }).sort({ createdAt: -1 });
    res.json(membership || null);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPlans, purchaseMembership, getMyMembership };
