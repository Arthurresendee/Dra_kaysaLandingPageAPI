import mongoose, { Document, Schema } from 'mongoose';

interface IImagem {
  fileId: string;
  filename: string;
}

export interface IGaleria extends Document {
  nomePaciente: string;
  imagemAntes: IImagem;
  imagemDepois: IImagem;
  imagemDepoimento: IImagem;
  createdAt: Date;
  updatedAt: Date;
}

const GaleriaSchema = new Schema<IGaleria>(
  {
    nomePaciente: {
      type: String,
      required: [true, 'Nome da paciente é obrigatório'],
      trim: true
    },
    imagemAntes: {
      fileId: {
        type: String,
        required: [true, 'ID do arquivo antes é obrigatório']
      },
      filename: {
        type: String,
        required: [true, 'Nome do arquivo antes é obrigatório']
      }
    },
    imagemDepois: {
      fileId: {
        type: String,
        required: [true, 'ID do arquivo depois é obrigatório']
      },
      filename: {
        type: String,
        required: [true, 'Nome do arquivo depois é obrigatório']
      }
    },
    imagemDepoimento: {
      fileId: {
        type: String,
        required: [true, 'ID do arquivo do depoimento é obrigatório']
      },
      filename: {
        type: String,
        required: [true, 'Nome do arquivo do depoimento é obrigatório']
      }
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IGaleria>('Galeria', GaleriaSchema); 