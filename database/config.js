const mongoose = require('mongoose');

const { MONGODB_CNN } = process.env;

const dbConnection = async() => {
  try {
    await mongoose.connect(MONGODB_CNN);
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
    throw new Error('MongoDB connection error');
  }
}

module.exports = {
  dbConnection
};