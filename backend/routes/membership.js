const express = require('express');
const router = express.Router();
const { getPlans, purchaseMembership, getMyMembership } = require('../controllers/membershipController');
const { protect } = require('../middleware/auth');

router.get('/plans', getPlans);
router.post('/purchase', protect, purchaseMembership);
router.get('/my', protect, getMyMembership);

module.exports = router;
