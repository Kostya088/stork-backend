import { model, Schema, SchemaTypes } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  }
);

export const Session = model('Session', sessionSchema);

