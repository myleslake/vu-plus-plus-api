import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  bio: { type: String },
  avatar: { type: String },
  role: { type: String, enum: ['admin', 'author', 'reader'], default: 'reader' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
