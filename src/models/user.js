import { model, Schema } from 'mongoose';
import { GENDERS } from '../constants/genders.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      maxlength: 64,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 128,
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dw5lx23vf/image/upload/v1776898970/leleka-app/avatars/x3pvpldi49evwdpdkgl9.jpg',
    },
    gender: {
      type: String,
      enum: GENDERS,
      default: null,
    },
    dueDate: {
      type: String,
      default: null,
    },
    theme: {
      type: String,
      enum: ['light', 'blue', 'pink'],
      default: 'light',
    },
    pendingEmail: {
      type: String,
      trim: true,
      default: null,
    },
    pendingEmailToken: {
      type: String,
      default: null,
    },
    pendingEmailTokenExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.pendingEmail;
  delete obj.pendingEmailToken;
  delete obj.pendingEmailTokenExpires;
  return obj;
};

export const User = model('User', userSchema);
