import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry,
} from '../controllers/diaryController.js';

import {
  createDiarySchema,
  updateDiarySchema,
  diaryIdSchema,
} from '../validations/diaryValidation.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', getAllEntries);

router.post('/', celebrate(createDiarySchema), createEntry);

router.get('/:id', celebrate(diaryIdSchema), getEntryById);

router.patch(
  '/:id',
  celebrate(diaryIdSchema),
  celebrate(updateDiarySchema),
  updateEntry,
);

router.delete('/:id', celebrate(diaryIdSchema), deleteEntry);

export default router;
