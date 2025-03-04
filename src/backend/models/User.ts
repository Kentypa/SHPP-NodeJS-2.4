import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  login: { type: String, unique: true },
  pass: String,
});

export default mongoose.model('User', UserSchema);
