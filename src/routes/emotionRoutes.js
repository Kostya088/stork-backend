/**
 * @swagger
 * /emotions:
 *   get:
 *     summary: Get all emotions
 *     tags: [Emotions]
 *     responses:
 *       200:
 *         description: List of emotions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 emotions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Emotion'
 */

import { Router } from 'express';
import { getEmotions } from '../controllers/emotionController.js';

const router = Router();

router.get('/emotions', getEmotions);

export default router;
