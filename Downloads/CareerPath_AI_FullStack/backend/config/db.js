import mongoose from 'mongoose';

async function connectDB() {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI not configured. Starting in stateless/demo mode.');
    return null;
  }
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.warn(`MongoDB unavailable: ${error.message}`);
    console.warn('Continuing without MongoDB. Auth/chat/project endpoints can still run.');
    return null;
  }
}
export default connectDB;
