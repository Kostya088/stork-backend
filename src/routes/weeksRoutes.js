/**
 * @swagger
 * /weeks:
 *   get:
 *     summary: Get public week information
 *     tags: [Weeks]
 *     parameters:
 *       - in: query
 *         name: week
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 42
 *           default: 1
 *         description: Week number
 *     responses:
 *       200:
 *         description: Week information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeekPublic'
 *       400:
 *         description: Invalid week number
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /weeks/me:
 *   get:
 *     summary: Get current week info for authenticated user
 *     tags: [Weeks]
 *     security:
 *       - refreshToken: []
 *     responses:
 *       200:
 *         description: Current week information based on user's due date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeekCurrent'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /weeks/baby/{weekNumber}:
 *   get:
 *     summary: Get baby info for specific week
 *     tags: [Weeks]
 *     security:
 *       - refreshToken: []
 *     parameters:
 *       - in: path
 *         name: weekNumber
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 42
 *         description: Week number
 *     responses:
 *       200:
 *         description: Baby information for the week
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BabyInfo'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Baby state not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /weeks/mom/{weekNumber}:
 *   get:
 *     summary: Get mom info for specific week
 *     tags: [Weeks]
 *     security:
 *       - refreshToken: []
 *     parameters:
 *       - in: path
 *         name: weekNumber
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 42
 *         description: Week number
 *     responses:
 *       200:
 *         description: Mom information for the week
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MomInfo'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Mom state not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

import { Router } from 'express';

import {
  getPublicWeeks,
  getCurrentWeeks,
  getBabyInfo,
  getMomInfo,
} from '../controllers/weeksController.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/weeks', getPublicWeeks);

router.get('/weeks/me', authenticate, getCurrentWeeks);

router.get('/weeks/baby/:weekNumber', authenticate, getBabyInfo);

router.get('/weeks/mom/:weekNumber', authenticate, getMomInfo);

export default router;
