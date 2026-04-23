import { model, Schema } from 'mongoose';
import { GENDERS } from '../constants/genders.js';

const userSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 32 },
    email: { type: String, required: true, maxlength: 64 },
    password: { type: String, required: true },
    gender: { type: String, enum: GENDERS },
    dueDate: { type: Date, required: true },
    avatar: {type: String},
  }
);

export const User = model('User', userSchema);
