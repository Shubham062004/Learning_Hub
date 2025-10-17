const Points = require('../models/Points');
const User = require('../models/User');

exports.getUserPoints = async (req, res) => {
  try {
    let points = await Points.findOne({ user: req.user.id });
    
    if (!points) {
      // Create points record if it doesn't exist
      points = new Points({
        user: req.user.id,
        totalPoints: 0,
        availablePoints: 0,
        spentPoints: 0,
        transactions: [],
        achievements: [],
        badges: []
      });
      await points.save();
    }

    res.json(points);
  } catch (error) {
    console.error('Get user points error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch user points', 
      error: error.message 
    });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const { category, limit = 10 } = req.query;

    const filter = {};
    if (category) filter['leaderboard.category'] = category;

    const leaderboard = await Points.find(filter)
      .populate('user', 'name email profilePic')
      .sort({ totalPoints: -1 })
      .limit(Number(limit));

    // Add rank to each entry
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      rank: index + 1,
      user: entry.user,
      totalPoints: entry.totalPoints,
      availablePoints: entry.availablePoints,
      achievements: entry.achievements.length,
      badges: entry.badges.length
    }));

    res.json(rankedLeaderboard);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch leaderboard', 
      error: error.message 
    });
  }
};

exports.getAchievements = async (req, res) => {
  try {
    const points = await Points.findOne({ user: req.user.id });
    
    if (!points) {
      return res.json({ achievements: [], badges: [] });
    }

    res.json({
      achievements: points.achievements,
      badges: points.badges
    });
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch achievements', 
      error: error.message 
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { type, source, page = 1, limit = 20 } = req.query;

    const filter = { user: req.user.id };
    if (type) filter['transactions.type'] = type;
    if (source) filter['transactions.source'] = source;

    const points = await Points.findOne(filter);
    
    if (!points) {
      return res.json({ transactions: [] });
    }

    let transactions = points.transactions;
    
    // Filter transactions if needed
    if (type || source) {
      transactions = transactions.filter(t => {
        if (type && t.type !== type) return false;
        if (source && t.source !== source) return false;
        return true;
      });
    }

    // Sort by date (newest first)
    transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedTransactions = transactions.slice(startIndex, endIndex);

    res.json({
      transactions: paginatedTransactions,
      pagination: {
        current: Number(page),
        pages: Math.ceil(transactions.length / Number(limit)),
        total: transactions.length
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch transactions', 
      error: error.message 
    });
  }
};

exports.earnPoints = async (req, res) => {
  try {
    const { amount, source, description, course, assignment, quiz, learningUnit } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    let points = await Points.findOne({ user: req.user.id });
    
    if (!points) {
      points = new Points({
        user: req.user.id,
        totalPoints: 0,
        availablePoints: 0,
        spentPoints: 0,
        transactions: [],
        achievements: [],
        badges: []
      });
    }

    await points.addPoints(amount, source, description, {
      course,
      assignment,
      quiz,
      learningUnit
    });

    res.json({
      message: 'Points earned successfully',
      points: {
        totalPoints: points.totalPoints,
        availablePoints: points.availablePoints,
        spentPoints: points.spentPoints
      }
    });
  } catch (error) {
    console.error('Earn points error:', error);
    res.status(500).json({ 
      message: 'Failed to earn points', 
      error: error.message 
    });
  }
};

exports.spendPoints = async (req, res) => {
  try {
    const { amount, source, description } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const points = await Points.findOne({ user: req.user.id });
    
    if (!points) {
      return res.status(400).json({ message: 'No points record found' });
    }

    await points.spendPoints(amount, source, description);

    res.json({
      message: 'Points spent successfully',
      points: {
        totalPoints: points.totalPoints,
        availablePoints: points.availablePoints,
        spentPoints: points.spentPoints
      }
    });
  } catch (error) {
    console.error('Spend points error:', error);
    res.status(500).json({ 
      message: 'Failed to spend points', 
      error: error.message 
    });
  }
};

