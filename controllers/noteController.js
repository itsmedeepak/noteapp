// controllers/noteController.js
const Note = require('../models/note');

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user._id });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content, owner: req.user._id });
    await note.save();

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { title, content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const shareNote = async (req, res) => {
    try {
      const { sharedUsername } = req.body;
  
      const note = await Note.findOne({ _id: req.params.id, owner: req.user._id });
  
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      // Check if the note is already shared with the user
      if (note.sharedWith.includes(sharedUsername)) {
        return res.status(400).json({ error: 'Note is already shared with this user' });
      }
  
      // Add the shared username to the note's sharedWith array
      note.sharedWith.push(sharedUsername);
      await note.save();
      res.status(500).json(note);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

// Export all the methods
module.exports = { getAllNotes, getNoteById, createNote, updateNote, deleteNote, shareNote };
