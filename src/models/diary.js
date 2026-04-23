import mongoose from 'mongoose';

const diarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    emotions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const Diary = mongoose.model('Diary', diarySchema);
