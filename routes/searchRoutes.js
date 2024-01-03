// routes/searchRoutes.js
const express = require('express');
const searchController = require('../controllers/searchController');
const authenticationMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticationMiddleware);

// GET /api/search?q=:query
router.get('/', searchController.searchNotes);

module.exports = router;