import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  console.log(
    "Mongo URI:",
    process.env.MONGODB_URI ? "✅ Loaded" : "❌ Missing"
  );
  await mongoose.connect(process.env.MONGODB_URI!);
};

export default connectDB;
