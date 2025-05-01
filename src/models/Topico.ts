import { Schema, model } from 'mongoose';
import { ITopico } from '../types/models';

const topicoSchema = new Schema<ITopico>({
  tituloTopico: { type: String, required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model<ITopico>('Topico', topicoSchema); 