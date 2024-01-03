const rateLimit = require('express-rate-limit');

// Create a limiter with specified options
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // maximum requests per window
  message: 'Too many requests from this IP, please try again later.',
});

module.exports = limiter;
