import { Request, Response } from 'express';
import Galeria, { IGaleria } from '../models/Galeria';
import gridfs from '../utils/gridfs';

class GaleriaController {
  // Criar novo registro
  static async create(req: Request, res: Response) {
    try {
      const { nomePaciente } = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (!files.imagemAntes?.[0] || !files.imagemDepois?.[0] || !files.imagemDepoimento?.[0]) {
        return res.status(400).json({ message: 'Todas as imagens são obrigatórias' });
      }

      // Upload das imagens para o GridFS
      const [imagemAntes, imagemDepois, imagemDepoimento] = await Promise.all([
        gridfs.uploadToGridFS(files.imagemAntes[0]),
        gridfs.uploadToGridFS(files.imagemDepois[0]),
        gridfs.uploadToGridFS(files.imagemDepoimento[0])
      ]);

      const galeria = new Galeria({
        nomePaciente,
        imagemAntes: {
          fileId: imagemAntes.id,
          filename: imagemAntes.filename
        },
        imagemDepois: {
          fileId: imagemDepois.id,
          filename: imagemDepois.filename
        },
        imagemDepoimento: {
          fileId: imagemDepoimento.id,
          filename: imagemDepoimento.filename
        }
      });

      await galeria.save();
      res.status(201).json(galeria);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar registro', error });
    }
  }

  // Listar todos os registros
  static async list(req: Request, res: Response) {
    try {
      const galerias = await Galeria.find().sort({ createdAt: -1 });
      res.json(galerias);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar registros', error });
    }
  }

  // Buscar registro específico
  static async getById(req: Request, res: Response) {
    try {
      const galeria = await Galeria.findById(req.params.id);
      if (!galeria) {
        return res.status(404).json({ message: 'Registro não encontrado' });
      }
      res.json(galeria);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar registro', error });
    }
  }

  // Atualizar registro
  static async update(req: Request, res: Response) {
    try {
      const { nomePaciente } = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const galeria = await Galeria.findById(req.params.id);

      if (!galeria) {
        return res.status(404).json({ message: 'Registro não encontrado' });
      }

      // Atualizar nome da paciente
      if (nomePaciente) {
        galeria.nomePaciente = nomePaciente;
      }

      // Atualizar imagens se fornecidas
      if (files.imagemAntes?.[0]) {
        // Remover imagem antiga
        await gridfs.deleteFromGridFS(galeria.imagemAntes.fileId);
        // Upload nova imagem
        const newImage = await gridfs.uploadToGridFS(files.imagemAntes[0]);
        galeria.imagemAntes = {
          fileId: newImage.id,
          filename: newImage.filename
        };
      }

      if (files.imagemDepois?.[0]) {
        await gridfs.deleteFromGridFS(galeria.imagemDepois.fileId);
        const newImage = await gridfs.uploadToGridFS(files.imagemDepois[0]);
        galeria.imagemDepois = {
          fileId: newImage.id,
          filename: newImage.filename
        };
      }

      if (files.imagemDepoimento?.[0]) {
        await gridfs.deleteFromGridFS(galeria.imagemDepoimento.fileId);
        const newImage = await gridfs.uploadToGridFS(files.imagemDepoimento[0]);
        galeria.imagemDepoimento = {
          fileId: newImage.id,
          filename: newImage.filename
        };
      }

      await galeria.save();
      res.json(galeria);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar registro', error });
    }
  }

  // Deletar registro
  static async delete(req: Request, res: Response) {
    try {
      const galeria = await Galeria.findById(req.params.id);
      if (!galeria) {
        return res.status(404).json({ message: 'Registro não encontrado' });
      }

      // Remover arquivos do GridFS
      await Promise.all([
        gridfs.deleteFromGridFS(galeria.imagemAntes.fileId),
        gridfs.deleteFromGridFS(galeria.imagemDepois.fileId),
        gridfs.deleteFromGridFS(galeria.imagemDepoimento.fileId)
      ]);

      await galeria.deleteOne();
      res.json({ message: 'Registro removido com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar registro', error });
    }
  }
}

export default GaleriaController; 