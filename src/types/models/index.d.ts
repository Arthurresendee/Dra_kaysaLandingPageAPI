import { Document } from 'mongoose';
import { IBaseDocument, ObjectId } from '../mongoose';

export interface IPaciente extends IBaseDocument {
  nome: string;
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

export interface IImagem extends IBaseDocument {
  url: string;
  descricao?: string;
  tipo: string;
} 