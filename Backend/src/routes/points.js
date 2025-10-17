const express = require('express');
const pointsController = require('../controllers/pointsController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Points routes
router.get('/', pointsController.getUserPoints);
router.get('/leaderboard', pointsController.getLeaderboard);
router.get('/achievements', pointsController.getAchievements);
router.get('/transactions', pointsController.getTransactions);
router.post('/earn', pointsController.earnPoints);
router.post('/spend', pointsController.spendPoints);

module.exports = router;

