import { Joi, Segments } from 'celebrate';
import { GENDERS } from '../constants/genders.js';

export const updateCurrentUserSchema = {
	[Segments.BODY]: Joi.object()
		.keys({
			name: Joi.string().trim().min(1).max(32),
			gender: Joi.string().valid(...GENDERS).allow(null),
			dueDate: Joi.string()
				.pattern(/^\d{4}-\d{2}-\d{2}$/)
				.message('invalid date!')
				.allow(null),
		})
		.min(1),
};

export const updateUserThemeSchema = {
	[Segments.BODY]: Joi.object({
		theme: Joi.string().valid('light', 'blue', 'pink').required(),
	}),
};

export const requestEmailChangeSchema = {
	[Segments.BODY]: Joi.object({
		email: Joi.string().email().max(64).required(),
	}),
};

export const confirmEmailChangeSchema = {
	[Segments.BODY]: Joi.object({
		token: Joi.string().required(),
	}),
};
