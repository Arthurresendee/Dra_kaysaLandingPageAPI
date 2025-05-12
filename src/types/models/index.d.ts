import { Document } from 'mongoose';
import { IBaseDocument, ObjectId } from '../mongoose';

// Outras interfaces podem ser adicionadas aqui

export interface ITopico extends IBaseDocument {
  tituloTopico: string;
  cards: ObjectId[];
}

export interface ICard extends IBaseDocument {
  titulo: string;
  texto: string;
  topico: ObjectId;
}

export interface IUsuarioSistema extends IBaseDocument {
  user: string;
  senha: string;
  verificarSenha(senha: string): Promise<boolean>;
} 