import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      required: false,
      default:
        'https://res.cloudinary.com/dw5lx23vf/image/upload/v1776898970/leleka-app/avatars/x3pvpldi49evwdpdkgl9.jpg',
    },
    gender: {
      type: String,
      enum: ['boy', 'girl', null],
      default: null,
    },
    dueDate: {
      type: Date,
      required: false,
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

userSchema.pre('save', async function () {
  if (!this.username) {
    this.username = this.email;
  }
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
