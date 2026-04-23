import { MomState } from '../models/momState.js';
import { BabyState } from '../models/babyState.js';

import {
  getWeekNumberFromDueDate,
  getDaysUntilDue,
  getDaysUntilDueFallback,
} from '../utils/pregnancy.js';

export const getPublicWeekInfo = async (req, res) => {
  try {
    const weekNumber = req.query.week
      ? parseInt(req.query.week, 10)
      : 1;

    if (weekNumber < 1 || weekNumber > 42) {
    const weekNumber = parseInt(req.query.week, 10);

    if (!weekNumber || weekNumber < 1 || weekNumber > 42) {
      return res.status(400).json({ error: 'Invalid week number' });
    }

    const [momState, babyState] = await Promise.all([
      MomState.findOne({ weekNumber }),
      BabyState.findOne({ weekNumber }),
    ]);

    return res.status(200).json({
      weekNumber,
      daysUntilDue: null,
      tipForMom: momState?.comfortTips?.[0]?.tip || null,
      babyInfo: babyState
        ? {
            analogy: babyState.analogy,
            image: babyState.image,
            development: babyState.babyDevelopment,
          }
        : null,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getCurrentWeekInfo = async (req, res) => {
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
      weekNumber,
      daysUntilDue,
      tipForMom: momState?.comfortTips?.[0]?.tip || null,
      babyInfo: babyState
        ? {
            gender,
            analogy: babyState.analogy,
            image: babyState.image,
            development: babyState.babyDevelopment,
            size: babyState.babySize,
            weight: babyState.babyWeight,
          }
        : null,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getBabyDevelopment = async (req, res) => {
  const weekNumber = parseInt(req.params.weekNumber, 10);

  if (!weekNumber || weekNumber < 1 || weekNumber > 40) {
    return res.status(400).json({ error: 'Invalid week number' });
  }

  const babyState = await BabyState.findOne({ weekNumber });

  if (!babyState) {
    return res.status(404).json({ error: 'Baby state not found' });
  }

  return res.status(200).json({
    weekNumber,
    development: babyState.babyDevelopment,
    size: babyState.babySize,
    weight: babyState.babyWeight,
    analogy: babyState.analogy,
    image: babyState.image,
  });
  try {
    const { dueDate } = req.user;

    const weekNumber = getWeekNumberFromDueDate(dueDate);

    if (!weekNumber) {
      return res.status(400).json({ error: 'Invalid week number' });
    }

    const babyState = await BabyState.findOne({ weekNumber });

    if (!babyState) {
      return res.status(404).json({ error: 'Baby state not found' });
    }

    return res.status(200).json({
      weekNumber,
      development: babyState.babyDevelopment,
      size: babyState.babySize,
      weight: babyState.babyWeight,
      analogy: babyState.analogy,
      image: babyState.image,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getMomBody = async (req, res) => {
  try {
    const { dueDate } = req.user;

    const weekNumber = getWeekNumberFromDueDate(dueDate);

    if (!weekNumber) {
      return res.status(400).json({ error: 'Invalid week number' });
    }

    const momState = await MomState.findOne({ weekNumber });

    if (!momState) {
      return res.status(404).json({ error: 'Mom state not found' });
    }

    return res.status(200).json({
      weekNumber,
      symptoms: momState.symptoms,
      bodyChanges: momState.bodyChanges,
      tips: momState.comfortTips,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
};
