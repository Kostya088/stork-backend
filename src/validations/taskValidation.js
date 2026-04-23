import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidation = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.message('Invalid id format');
};

export const getAllTasksSchema = {
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    isDone: Joi.boolean(),
    search: Joi.string().trim().allow(''),
  }),
};

export const taskIdSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    taskId: Joi.string().custom(objectIdValidation).required(),
  }),
};

export const createTaskSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(1).required(),
    date: Joi.date().required(),
  }),
};

export const updateTaskSchema = {
  [Segments.BODY]: Joi.object().keys({
    isDone: Joi.boolean().required(),
  }),

  [Segments.PARAMS]: Joi.object().keys({
    taskId: Joi.string().custom(objectIdValidation).required(),
  }),
};
