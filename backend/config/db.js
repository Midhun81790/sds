const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn('MONGO_URI is not set. Falling back to mongodb://127.0.0.1:27017/sds');
  }

  const connectionUri = uri || 'mongodb://127.0.0.1:27017/sds';

  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(connectionUri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
};

module.exports = connectDB;
