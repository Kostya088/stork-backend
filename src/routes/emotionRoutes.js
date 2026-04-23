import { Router } from 'express';
import { getEmotions } from '../controllers/emotionController.js';

/**
 * @swagger
 * /emotions:
 *   get:
 *     summary: Get all emotions
 *     responses:
 *       200:
 *         description: List of emotions
 */

const router = Router();

router.get('/emotions', getEmotions);

export default router;
