import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    const connectionString = process.env.MONGO_URI; // Get connection string from .env
    if (!connectionString) {
      throw new Error("MongoDB URI is not defined in .env file");
    }

    // Connect to MongoDB
    await mongoose.connect(connectionString, {
      autoIndex: true,         // Enables automatic index creation (useful for development)
      serverSelectionTimeoutMS: 5000, // Wait up to 5 seconds for server selection
      socketTimeoutMS: 45000,  // Close sockets after 45 seconds of inactivity
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
