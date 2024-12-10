const users = new Instance("Users", "users");  // Assuming you're using the 'Instance' from your `queries.js`

// Middleware to check if the user is authenticated (i.e., verified)
function isAuthenticated(req, res, next) {
    const { email } = req.body;
    if (!email) {
        return res.status(401).json({ message: 'Authentication required.' });
    }

    users.read({ email })
        .then(() => {
            const user = users.getPayload()[0];
            if (!user || !user.isVerified) {
                return res.status(403).json({ message: 'Access denied. Please verify your email.' });
            }
            req.user = user; // Attach the user data to the request for further checks
            next(); // Proceed to the next middleware or route handler
        })
        .catch((error) => {
            console.error('Error during authentication:', error);
            res.status(500).json({ message: 'Error authenticating user.' });
        });
}

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
    const user = req.user;
    if (user && user.role === 'admin') {
        return next(); // Proceed if user is admin
    }
    res.status(403).json({ message: 'Admin access required.' });
}

// Middleware to check if the user is a regular user
function isUser(req, res, next) {
    const user = req.user;
    if (user && (user.role === 'user' || user.role === 'admin')) {
        return next(); // Proceed if user is a regular user or admin
    }
    res.status(403).json({ message: 'User access required.' });
}

module.exports = {
    isAuthenticated,
    isAdmin,
    isUser,
};
