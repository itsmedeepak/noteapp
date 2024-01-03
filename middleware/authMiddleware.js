// middleware/authenticationMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming you have a User model

const authenticationMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, 'wK2E7BUSI7J6AhpOCTj'); // Use your actual secret key

    // Check if the user exists
    const user = await User.findById(decodedToken.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Attach the user to the request object for further use
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticationMiddleware;
