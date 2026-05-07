import { Joi, Segments } from 'celebrate';
import { GENDERS } from '../constants/genders.js';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().max(32),
    email: Joi.string().email().required().max(64),
    password: Joi.string().required().min(8).max(128),
    avatar: Joi.string(),
    gender: Joi.string()
      .valid(...GENDERS)
      .allow(null),
    dueDate: Joi.string()
      .pattern(/^(\d{4})-(\d{2})-(\d{2})$/)
      .message('invalid date!'),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
  }),
};

export const resetPasswordSchema = {
  [Segments.BODY]: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
};

export const loginWithGoogleSchema = {
  [Segments.BODY]: Joi.object({
    token: Joi.string().required(),
  }),
};
