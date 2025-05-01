import { Schema, model } from 'mongoose';
import { ITopico } from '../types/models';

const cardSchema = new Schema({
  titulo: { type: String, required: true },
  texto: { type: String, required: true }
});

const topicoSchema = new Schema<ITopico>({
  tituloTopico: { type: String, required: true },
  cards: [cardSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model<ITopico>('Topico', topicoSchema); 