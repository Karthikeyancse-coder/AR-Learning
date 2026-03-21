import mongoose from "mongoose";

let isConnected = false;

export const connectDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,  // Give up after 8s
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    isConnected = false;
    console.error("❌ Could not connect to MongoDB:", error.message);
    console.warn("⚠️  Server will continue but database features will be unavailable.");
  }
};

// Returns true if mongoose is in connected state (readyState === 1)
export const isDbReady = () => {
  return mongoose.connection.readyState === 1;
};
