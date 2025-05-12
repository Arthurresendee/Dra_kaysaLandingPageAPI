import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import { Readable } from 'stream';

let bucket: GridFSBucket;

// Inicializa o bucket do GridFS
export const initGridFS = () => {
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('Conexão com o banco de dados não estabelecida');
  }
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: 'images'
  });
};

// Upload de arquivo para o GridFS
export const uploadToGridFS = async (file: Express.Multer.File): Promise<{ id: string; filename: string }> => {
  if (!bucket) {
    throw new Error('GridFS não inicializado');
  }

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(file.originalname, {
      contentType: file.mimetype
    });

    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);

    readableStream.pipe(uploadStream)
      .on('error', (error) => {
        reject(error);
      })
      .on('finish', () => {
        resolve({
          id: uploadStream.id.toString(),
          filename: file.originalname
        });
      });
  });
};

// Download de arquivo do GridFS
export const downloadFromGridFS = async (fileId: string): Promise<Buffer> => {
  if (!bucket) {
    throw new Error('GridFS não inicializado');
  }

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));

    downloadStream.on('data', (chunk) => chunks.push(chunk));
    downloadStream.on('error', (error) => reject(error));
    downloadStream.on('end', () => resolve(Buffer.concat(chunks)));
  });
};

// Deletar arquivo do GridFS
export const deleteFromGridFS = async (fileId: string): Promise<void> => {
  if (!bucket) {
    throw new Error('GridFS não inicializado');
  }

  await bucket.delete(new mongoose.Types.ObjectId(fileId));
};

// Obter URL do arquivo
export const getFileUrl = (fileId: string): string => {
  return `/api/files/${fileId}`;
};

export default {
  initGridFS,
  uploadToGridFS,
  downloadFromGridFS,
  deleteFromGridFS,
  getFileUrl
}; 