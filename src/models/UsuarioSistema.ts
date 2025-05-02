import { Schema, model } from 'mongoose';
import { IUsuarioSistema } from '../types/models';

const usuarioSistemaSchema = new Schema<IUsuarioSistema>({
  user: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model<IUsuarioSistema>('UsuarioSistema', usuarioSistemaSchema); 