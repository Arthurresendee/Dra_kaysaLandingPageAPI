import { Document, Types } from 'mongoose';

export interface IBaseDocument extends Document {
  createdAt: Date;
  updatedAt: Date;
}

export type ObjectId = Types.ObjectId; 