// controllers/searchController.js
const  Note  = require('../models/note');

const searchNotes = async (req, res) => {
  try {
    const query = req.query.q;
    const notes = await Note.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive title search
        { content: { $regex: query, $options: 'i' } }, // Case-insensitive content search
      ],
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { searchNotes };
