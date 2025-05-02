import { Schema, model } from 'mongoose';
import { IUsuarioSistema } from '../types/models';
import bcrypt from 'bcryptjs';

const usuarioSistemaSchema = new Schema<IUsuarioSistema>({
  user: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash da senha antes de salvar
usuarioSistemaSchema.pre('save', async function(next) {
  if (this.isModified('senha')) {
    this.senha = await bcrypt.hash(this.senha, 8);
  }
  next();
});

// Método para verificar senha
usuarioSistemaSchema.methods.verificarSenha = async function(senha: string) {
  return bcrypt.compare(senha, this.senha);
};

export default model<IUsuarioSistema>('UsuarioSistema', usuarioSistemaSchema); 