import { Schema, model } from 'mongoose';
import { ICard } from '../types/models';

const cardSchema = new Schema<ICard>({
  titulo: { type: String, required: true },
  texto: { type: String, required: true },
  topico: { type: Schema.Types.ObjectId, ref: 'Topico' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model<ICard>('Card', cardSchema); 