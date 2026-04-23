import { Emotion } from '../models/emotion.js';

export const getEmotions = async (req, res) => {
  const emotions = await Emotion.find({});

  res.status(200).json(emotions);
};
