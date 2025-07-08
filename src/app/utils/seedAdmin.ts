import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
  // ✅ dynamically import to avoid cycles
  const UserModule = await import('../models/User'); 
  const User = UserModule.default;

  await mongoose.connect(process.env.MONGO_URI!);

  const existing = await User.findOne({ email: 'admin@arudeal.com' });
  if (existing) {
    console.log('⚠️ Admin already exists');
    process.exit(0);
  }

  await User.create({
    name: 'Admin',
    email: 'admin@arudeal.com',
    password: process.env.ADMIN_PASSWORD,
    role: 'admin',
  });

  console.log('✅ Admin seeded');
  process.exit(0);
};

seedAdmin().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
