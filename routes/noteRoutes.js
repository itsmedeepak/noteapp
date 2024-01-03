// routes/noteRoutes.js
const express = require('express');
const noteController = require('../controllers/noteController');
const authenticationMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticationMiddleware);

// GET /api/notes
router.get('/', noteController.getAllNotes);

// GET /api/notes/:id
router.get('/:id', noteController.getNoteById);

// POST /api/notes
router.post('/', noteController.createNote);

// PUT /api/notes/:id
router.put('/:id', noteController.updateNote);

// DELETE /api/notes/:id
router.delete('/:id', noteController.deleteNote);

// POST /api/notes/:id/share
router.post('/:id/share', noteController.shareNote);

module.exports = router;
