import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  text: String,
  checked: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Item', ItemSchema);
