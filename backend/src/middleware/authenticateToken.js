const jwt = require('jsonwebtoken');
const secretKey = '2c1c722cd37ec25908a5233037839a1cb8cfaa1a6eff4c7e5444bc1e339f512c'; // Make sure this matches the secret used to sign the token

// Middleware to verify the JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    // Check if token is present
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    // Verify token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        // Attach user data to request object for use in next handlers
        req.user = user;
        next();
    });
};

module.exports = {
    authenticateToken
}