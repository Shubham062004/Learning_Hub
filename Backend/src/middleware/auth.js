const jwt = require('../utils/jwt');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verifyToken(token);
    const user = await User.findById(decoded.id);
    
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Invalid token or user deactivated.' });
    }

    req.user = { id: user._id, role: user.role };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

