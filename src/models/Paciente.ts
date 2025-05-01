import { Schema, model } from 'mongoose';
import { IPaciente } from '../types/models';

const pacienteSchema = new Schema<IPaciente>({
  nome: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model<IPaciente>('Paciente', pacienteSchema); 