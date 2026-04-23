import createHttpError from "http-errors";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import { createSession, setSessionCookies } from "../services/auth.js";
import { Session } from "../models/session.js";
// import jwt from "jsonwebtoken";
// import path from 'node:path';
// import fs from 'node:fs/promises';
// import Handlebars from "handlebars";
// import { sendEmail } from "../utils/sendMail.js";

export const registerUser = async (req, res) => {
  const { email, password, name, gender, dueDate, avatar} = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(400, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashPassword,
    name,
    gender,
    dueDate,
    avatar,
  });

  const session = await createSession(user._id);

  await setSessionCookies(res, session);

  res.status(201).json(user);

};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await Session.findOneAndDelete({ userId: user._id });

  const session = await createSession(user._id);

  await setSessionCookies(res, session);

  res.status(200).json(user);
};

export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await Session.findOne({ _id : sessionId, refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const refreshTokenUntilValid = session.refreshTokenValidUntil;

  if (new Date() > new Date(refreshTokenUntilValid)) {
    throw createHttpError(401, 'Session token expired');
  }

  await session.deleteOne();

  const newSession = await createSession(session.userId);

  await setSessionCookies(res, newSession);

  res.status(200).json({ "message": "Session refreshed" });
};

export const logoutUser = async(req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.findByIdAndDelete(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.sendStatus(204);
};


// Доп задание

// export const requestResetEmail = async (req, res) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(200,).json({ message: 'Password reset email sent successfully!!!' });
//   }

//   const resetToken = jwt.sign({
//     sub: user._id,
//     email: email,
//   }, process.env.JWT_SECRET, { expiresIn: '15m' });

//   const pathFile = path.resolve('src/templates/reset-password-email.html');

//   const HTMLcode = await fs.readFile(pathFile, 'utf-8');

//   const messageTemplate = Handlebars.compile(HTMLcode);

//   const html = messageTemplate({
//     link: `${process.env.FRONTEND_DOMAIN}/reset-password?token=${resetToken}`,
//     name: user.username,
//     token: resetToken,
//   });

//   try {
//     await sendEmail({
//     from: process.env.SMTP_FROM,
//     to: email,
//     subject: 'Reset password',
//     html: html,
//   });
//   } catch (error) {
//     console.log(error);

//     throw createHttpError(500, 'Failed to send the email, please try again later.');
//   }

//   res.status(200).json({ message: 'Password reset email sent successfully' });
// };

// export const resetPassword = async (req, res) => {
//   const { token, password } = req.body;

//   let result;

//   try {
//     result = jwt.verify(token, process.env.JWT_SECRET);
//   } catch {
//     throw createHttpError(401, 'Invalid or expired token');
//   }

//   const user = await User.findOne({
//     _id: result.sub,
//     email: result.email,
//   });

//   if (!user) {
//     throw createHttpError(404, 'User not found');
//   }

//   const hashPassword = await bcrypt.hash(password, 10);

//   user.password = hashPassword;

//   await user.save();

//   res.status(200).json( {
//     message: 'Password reset successfully'
//   });
// };


