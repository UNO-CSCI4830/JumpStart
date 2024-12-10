const User = require('./models/User'); // Import the User model

// Middleware to check if the user is authenticated (email verified)
function isAuthenticated(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user || !user.isVerified) {
      return res.status(403).json({ message: 'Access denied.' });
    }
    req.user = user; // Attach user to request for further checks
    next();
  });
}

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }
  next();
}

// Middleware to check if the user is a verified user
function isUser(req, res, next) {
  if (req.user.role !== 'user' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'User access required.' });
  }
  next();
}

module.exports = {
  isAuthenticated,
  isAdmin,
  isUser,
};
