import { MomState } from '../models/momState.js';
import { BabyState } from '../models/babyState.js';

import {
  getWeekNumberFromDueDate,
  getDaysUntilDue,
  getDaysUntilDueFallback,
} from '../utils/pregnancy.js';

export const getPublicWeeks = async (req, res) => {
  try {
    const weekNumber = req.query.week ? parseInt(req.query.week, 10) : 1;

    if (weekNumber < 1 || weekNumber > 42) {
      const weekNumber = parseInt(req.query.week, 10);

      if (!weekNumber || weekNumber < 1 || weekNumber > 42) {
        return res.status(400).json({ error: 'Invalid week number' });
      }
    }

    const [momState, babyState] = await Promise.all([
      MomState.findOne({ weekNumber }),
      BabyState.findOne({ weekNumber }),
    ]);

    return res.status(200).json({
      weekNumber,
      daysUntilDue: getDaysUntilDueFallback(weekNumber),
      babyInfo: babyState
        ? {
            image: babyState.image,
            babySize: babyState.babySize,
            babyWeight: babyState.babyWeight,
            babyActivity: babyState.babyActivity,
            babyDevelopment: babyState.babyDevelopment,
          }
        : null,
      tipForMom: momState?.comfortTips?.[0]?.tip || null,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getCurrentWeeks = async (req, res) => {
  try {
    const { dueDate, gender } = req.user;

    let weekNumber = getWeekNumberFromDueDate(dueDate);
    let daysUntilDue = getDaysUntilDue(dueDate);

    if (!weekNumber) weekNumber = 1;

    if (daysUntilDue === null) {
      daysUntilDue = getDaysUntilDueFallback(weekNumber);
    }

    const [momState, babyState] = await Promise.all([
      MomState.findOne({ weekNumber }),
      BabyState.findOne({ weekNumber }),
    ]);

    return res.status(200).json({
      gender,
      weekNumber,
      daysUntilDue,
      babyInfo: babyState
        ? {
            analogy: babyState.analogy,
            image: babyState.image,
            babySize: babyState.babySize,
            babyWeight: babyState.babyWeight,
            babyActivity: babyState.babyActivity,
            babyDevelopment: babyState.babyDevelopment,
          }
        : null,
      tipForMom: momState?.comfortTips?.[0]?.tip || null,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getBabyInfo = async (req, res) => {
  try {
    const weekNumber = parseInt(req.params.weekNumber, 10);

    if (Number.isNaN(weekNumber) || weekNumber < 1 || weekNumber > 42) {
      return res.status(400).json({ error: 'Invalid week number' });
    }

    const babyState = await BabyState.findOne({ weekNumber });

    if (!babyState) {
      return res.status(404).json({ error: 'Baby state not found' });
    }

    return res.status(200).json({
      weekNumber,
      image: babyState.image,
      analogy: babyState.analogy,
      development: babyState.babyDevelopment,
      interestingFact: babyState.interestingFact,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getMomInfo = async (req, res) => {
  try {
    const weekNumber = parseInt(req.params.weekNumber, 10);

    if (Number.isNaN(weekNumber) || weekNumber < 1 || weekNumber > 42) {
      return res.status(400).json({ error: 'Invalid week number' });
    }

    const momState = await MomState.findOne({ weekNumber });

    if (!momState) {
      return res.status(404).json({ error: 'Mom state not found' });
    }

    return res.status(200).json({
      weekNumber,
      feelings: momState.feelings?.states ?? [],
      comfortTips: momState.comfortTips,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
