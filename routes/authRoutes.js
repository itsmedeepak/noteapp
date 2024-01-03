// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const authenticationMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', authController.signup);

// POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;
