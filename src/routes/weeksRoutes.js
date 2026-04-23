import { Router } from 'express';

import {
  getPublicWeekInfo,
  getCurrentWeekInfo,
  getBabyDevelopment,
  getMomBody,
} from '../controllers/weeksController.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/weeks', getPublicWeekInfo);

router.get('/weeks/current', authenticate, getCurrentWeekInfo);

router.get(
  '/weeks/:weekNumber/baby-development',
  authenticate,
  getBabyDevelopment,
);

router.get('/weeks/:weekNumber/mom-body', authenticate, getMomBody);

export default router;
