import { Schema, model } from 'mongoose';
import { IImagem } from '../types/models';

const imagemSchema = new Schema<IImagem>({
  url: { type: String, required: true },
  descricao: String,
  tipo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model<IImagem>('Imagem', imagemSchema); 