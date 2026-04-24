/**
 * @swagger
 * /diaries:
 *   get:
 *     summary: Get all diary entries for current user
 *     tags: [Diaries]
 *     security:
 *       - refreshToken: []
 *     responses:
 *       200:
 *         description: List of diary entries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 diaries:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Diary'
 *                 total:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /diaries:
 *   post:
 *     summary: Create a new diary entry
 *     tags: [Diaries]
 *     security:
 *       - refreshToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDiary'
 *     responses:
 *       201:
 *         description: Diary entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Diary'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /diaries/{id}:
 *   patch:
 *     summary: Update a diary entry
 *     tags: [Diaries]
 *     security:
 *       - refreshToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Diary entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDiary'
 *     responses:
 *       200:
 *         description: Diary entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Diary'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Diary entry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /diaries/{id}:
 *   delete:
 *     summary: Delete a diary entry
 *     tags: [Diaries]
 *     security:
 *       - refreshToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Diary entry ID
 *     responses:
 *       204:
 *         description: Diary entry deleted successfully
 *       400:
 *         description: Invalid diary ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Diary entry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllEntries,
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

router.use('/diaries', authenticate);

router.post('/diaries', celebrate(createDiarySchema), createEntry);

router.get('/diaries', getAllEntries);

router.patch(
  '/diaries/:id',
  celebrate(diaryIdSchema),
  celebrate(updateDiarySchema),
  updateEntry,
);

router.delete('/diaries/:id', celebrate(diaryIdSchema), deleteEntry);

export default router;
