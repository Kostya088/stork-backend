import { Joi } from 'celebrate';

export const createDiarySchema = {
  body: Joi.object({
    title: Joi.string().min(2).max(100).trim().required(),
    content: Joi.string().min(1).trim().required(),
    emotions: Joi.array().items(Joi.string()).optional(),
  }),
};

export const updateDiarySchema = {
  body: Joi.object({
    title: Joi.string().min(2).max(100).trim(),
    content: Joi.string().min(1).trim(),
    emotions: Joi.array().items(Joi.string()).optional(),
  }),
};

export const diaryIdSchema = {
  params: Joi.object({
    id: Joi.string().length(24).hex().required(),
  }),
};
