const jwt = require('jsonwebtoken');

exports.generateToken = (userId, expiresIn = process.env.JWT_EXPIRE) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

