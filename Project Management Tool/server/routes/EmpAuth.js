// auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (authHeader) => {
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // Return user information
  } catch (error) {
    return null;
  }
};

const isAuthenticated = (req, res, next) => {
  const user = verifyToken(req.headers.authorization);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { isAuthenticated, verifyToken };
