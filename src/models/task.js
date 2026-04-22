import { model, Schema, SchemaTypes } from 'mongoose';

const taskSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: [true, 'Task name is required'],
      trim: true,
      minlength: 1,
      maxlength: 96,
    },

    date: {
      type: Date,
      required: [true, 'Task date is required'],
    },

    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Task = model('Task', taskSchema);
