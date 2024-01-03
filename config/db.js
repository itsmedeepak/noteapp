// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGODB_URI = 'mongodb://localhost:27017/noteApp';
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
