import { Request, Response } from 'express';
import Imagem from '../models/Imagem';

class ImagemController {
  async getAll(req: Request, res: Response) {
    try {
      const imagens = await Imagem.find();
      res.json(imagens);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar imagens', error });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const imagem = await Imagem.findById(req.params.id);
      if (!imagem) {
        return res.status(404).json({ message: 'Imagem não encontrada' });
      }
      res.json(imagem);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar imagem', error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const imagem = new Imagem(req.body);
      await imagem.save();
      res.status(201).json(imagem);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao criar imagem', error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const imagem = await Imagem.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );
      if (!imagem) {
        return res.status(404).json({ message: 'Imagem não encontrada' });
      }
      res.json(imagem);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao atualizar imagem', error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const imagem = await Imagem.findByIdAndDelete(req.params.id);
      if (!imagem) {
        return res.status(404).json({ message: 'Imagem não encontrada' });
      }
      res.json({ message: 'Imagem deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar imagem', error });
    }
  }
}

export default new ImagemController(); 