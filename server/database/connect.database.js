import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
    console.warn("⚠️ Warning: MongoDB is temporarily unavailable. DB-dependent features may fail. Server continuing gracefully...");
  }
};
