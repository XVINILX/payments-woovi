import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/graphql-api");
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
