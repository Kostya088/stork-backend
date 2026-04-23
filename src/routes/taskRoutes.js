import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from '../controllers/taskController.js';
import {
  getAllTasksSchema,
  taskIdSchema,
  createTaskSchema,
  updateTaskSchema,
} from '../validations/taskValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use('/tasks', authenticate);

router.get('/tasks', celebrate(getAllTasksSchema), getTasks);
router.post('/tasks', celebrate(createTaskSchema), createTask);
router.delete('/tasks/:taskId', celebrate(taskIdSchema), deleteTask);
router.patch('/tasks/:taskId', celebrate(updateTaskSchema), updateTaskStatus);

export default router;
