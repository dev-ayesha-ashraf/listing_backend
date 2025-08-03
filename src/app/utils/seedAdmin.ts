import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  const UserModule = await import("../models/User.ts");
  const User = UserModule.default;

  await mongoose.connect(process.env.MONGODB_URI!);

  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) {
    console.log("⚠️ Admin already exists");
    process.exit(0);
  }

  await User.create({
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: "admin",
  });

  console.log("✅ Admin seeded");
  process.exit(0);
};

seedAdmin().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
