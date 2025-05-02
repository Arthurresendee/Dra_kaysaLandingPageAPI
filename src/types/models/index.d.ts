import { Document } from 'mongoose';
import { IBaseDocument, ObjectId } from '../mongoose';

export interface IPaciente extends IBaseDocument {
  nome: string;
  imagens?: Array<{
    url: string;
    descricao?: string;
    tipo: string;
  }>;
}

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
} 