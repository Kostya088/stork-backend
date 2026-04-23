import createHttpError from 'http-errors';
import { Task } from '../models/task.js';

export const createTask = async (req, res) => {
  const { name, date } = req.body;
  const userId = req.user._id;

  if (!name || !date) {
    throw createHttpError(400, 'Name and date are required');
  }

  const task = await Task.create({
    name,
    date,
    userId,
    isDone: false,
  });

  res.status(201).json({
    status: 201,
    message: 'Task created successfully',
    data: task,
  });
};

export const getTasks = async (req, res) => {
  const userId = req.user._id;

  const tasks = await Task.find({ userId }).sort({ date: 1 });

  res.status(200).json({
    status: 200,
    message: 'Tasks retrieved successfully',
    data: tasks,
  });
};

export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { isDone } = req.body;
  const userId = req.user._id;

  if (typeof isDone !== 'boolean') {
    throw createHttpError(400, 'isDone must be boolean');
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    { isDone },
    { new: true },
  );

  if (!task) {
    throw createHttpError(404, 'Task not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Task updated successfully',
    data: task,
  });
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user._id;

  const task = await Task.findOneAndDelete({ _id: taskId, userId });

  if (!task) {
    throw createHttpError(404, 'Task not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Task deleted successfully',
  });
};
