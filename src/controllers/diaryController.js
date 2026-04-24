import createHttpError from 'http-errors';
import { Diary } from '../models/diary.js';

// GET all (сортування від нових до старих)
export async function getAllEntries(req, res) {
  const entries = await Diary.find({
    userId: req.user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json(entries);
}

// CREATE
export async function createEntry(req, res) {
  const entry = await Diary.create({
    ...req.body,
    userId: req.user._id,
  });

  res.status(201).json(entry);
}

// UPDATE
export async function updateEntry(req, res) {
  const { id } = req.params;

  const entry = await Diary.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    req.body,
    { returnDocument: 'after' },
  );

  if (!entry) {
    throw createHttpError(404, 'Entry not found');
  }

  res.status(200).json(entry);
}

// DELETE
export async function deleteEntry(req, res) {
  const { id } = req.params;

  const entry = await Diary.findOneAndDelete({
    _id: id,
    userId: req.user._id,
  });

  if (!entry) {
    throw createHttpError(404, 'Entry not found');
  }

  res.status(200).json(entry);
}
