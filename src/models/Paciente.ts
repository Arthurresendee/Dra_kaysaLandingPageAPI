import { Schema, model } from 'mongoose';
import { IPaciente } from '../types/models';

const imagemSchema = new Schema({
  url: { type: String, required: true },
  descricao: { type: String },
  tipo: { type: String, required: true }
});

const pacienteSchema = new Schema<IPaciente>({
  nome: { type: String, required: true },
  imagens: [imagemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model<IPaciente>('Paciente', pacienteSchema); 