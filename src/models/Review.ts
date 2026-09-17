import mongoose from 'mongoose';

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  name: {
    type: 'string',
    required: true,
  },
  content: {
    type: 'string',
    required: true,
  },
  rating: {
    type: 'number',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  book_id: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
});

export default mongoose.model('reviews', ReviewSchema);
