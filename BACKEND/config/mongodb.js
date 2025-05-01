import mongoose from 'mongoose';

const connect_DB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected successfully');

    // Test query to verify connection
    const admin = await mongoose.connection.db.admin().ping();
    console.log('MongoDB Ping:', admin);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connect_DB;