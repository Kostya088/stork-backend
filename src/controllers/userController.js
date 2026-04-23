import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { sendEmail } from '../utils/sendMail.js';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'crypto';
import { FIFTEEN_MINUTES } from '../constants/time.js';

const getThemeByGender = (gender) => {
  if (gender === 'boy') return 'blue';
  if (gender === 'girl') return 'pink';
  return 'light';
};

const buildPublicUserResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  gender: user.gender,
  dueDate: user.dueDate,
  theme: user.theme,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const getCurrentUser = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'Unauthorized');
  }

  res.status(200).json(buildPublicUserResponse(req.user));
};

export const updateCurrentUser = async (req, res) => {
  const { name, gender, dueDate } = req.body;

  const updateFields = {};

  if (name !== undefined) {
  const trimmedName = name.trim();
  if (!trimmedName) {
    throw createHttpError(400, 'Name cannot be empty');
  }
  updateFields.name = trimmedName;
}

  if (gender !== undefined) {
    updateFields.gender = gender;
    updateFields.theme = getThemeByGender(gender);
  }

  if (dueDate !== undefined) {
    updateFields.dueDate = dueDate;
  }

  const user = await User.findOneAndUpdate({ _id: req.user._id }, updateFields, {
    returnDocument: 'after',
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(buildPublicUserResponse(user));
};

export const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, 'No file');
  }

  const result = await saveFileToCloudinary(req.file.buffer, req.user._id);

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar: result.secure_url },
    { returnDocument: 'after' },
  );

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({ url: user.avatar });
};

export const updateUserTheme = async (req, res) => {
  const { theme } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { theme },
    { returnDocument: 'after' },
  );

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({ theme: user.theme });
};

export const requestEmailChange = async (req, res) => {
  const { email } = req.body;
  const currentUser = req.user;

  if (!email || email === currentUser.email) {
    throw createHttpError(400, 'Invalid email');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(400, 'Email already in use');
  }

  const pendingEmailToken = crypto.randomBytes(30).toString('hex');

  const templatePath = path.resolve('src/templates/confirm-email-change.html');
  const templateSource = await fs.readFile(templatePath, 'utf-8');
  const template = handlebars.compile(templateSource);

  const html = template({
    name: currentUser.name,
    newEmail: email,
    link: `${process.env.FRONTEND_DOMAIN}/confirm-email-change?token=${pendingEmailToken}`,
  });

  await User.findByIdAndUpdate(currentUser._id, {
    pendingEmail: email,
    pendingEmailToken,
    pendingEmailTokenExpires: new Date(Date.now() + FIFTEEN_MINUTES),
  });

  await sendEmail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Confirm email change',
    html,
  });

  res.status(200).json({
    message: 'Confirmation email sent to your new email address',
  });
};

export const confirmEmailChange = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw createHttpError(400, 'Token is required');
  }

  const user = await User.findOne({
    pendingEmailToken: token,
    pendingEmailTokenExpires: { $gt: new Date() },
  });

  if (!user || !user.pendingEmail) {
    throw createHttpError(400, 'Invalid or expired token');
  }

  const emailAlreadyInUse = await User.findOne({
    email: user.pendingEmail,
    _id: { $ne: user._id },
  });

  if (emailAlreadyInUse) {
    throw createHttpError(400, 'Email already in use');
  }

  await User.findByIdAndUpdate(user._id, {
    email: user.pendingEmail,
    $unset: {
      pendingEmail: 1,
      pendingEmailToken: 1,
      pendingEmailTokenExpires: 1,
    },
  });

  res.status(200).json({ message: 'Email changed successfully' });
};
