import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin'], default: 'admin' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this as IUser;

  if (!user.isModified('password')) return next();
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidate: string) {
  const user = this as IUser;
  return bcrypt.compare(candidate, user.password);
};

// ✅ Wrap model export safely for ESM + Hot reload + Seeders
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
